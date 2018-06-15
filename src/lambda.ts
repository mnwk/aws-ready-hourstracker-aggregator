import { mailConfig, mailer, reducer, s3Source } from './config'
import { IMailConfig } from './entities/entities'
import { getEnv } from './utils/wrapper'
import { MimeExtractor } from './sources/MimeExtractor'
import { TimeTrackingList } from './entities/TimeTrackingList'
import { Transformer } from './entities/Transformer'
import { CsvParser } from './entities/CsvParser'

exports.handler = async (event, context, callback) => {
  const s3 = s3Source()
  const mailData = await s3.get(event.Records[ 0 ].ses.mail.messageId)
  const attachment = MimeExtractor.getAttachmentBuffer(<Buffer>mailData, getEnv('ATTACHMENT_NAME'))
  const csvArray = await CsvParser.parseCsvBuffer(attachment)
  const timeTrackingTable = new TimeTrackingList(Transformer.transform(csvArray))
  timeTrackingTable.filterByProject(getEnv('PROJECT_NAME'))
  timeTrackingTable.reduce(reducer)
  const result = timeTrackingTable.getListArray().map(item => `${item.date},${item.startTime},${item.endTime},${item.duration}`).join('\n')

  const message: IMailConfig = {
    ...mailConfig(),
    attachments: [ {
      filename: 'timesheets_procesed.csv',
      content: Buffer.from(result).toString('base64'),
      encoding: 'base64'
    },
      {
        filename: 'timesheets_original.csv',
        content: attachment.toString('base64'),
        encoding: 'base64'
      } ]
  }
  await mailer().send(message)
}