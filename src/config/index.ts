import { S3File } from '../sources/S3File'
import { getEnv } from '../utils/wrapper'
import { IMailConfig } from '../entities/entities'
import { Mailer } from '../Mailer'
import { oncePerDayReducer } from '../entities/OncePerDayReducer'

export const s3Source = (): S3File => {
  return new S3File(getEnv('EMAILBUCKET'))
}

export const mailConfig = (): IMailConfig => {
  return {
    from: getEnv('EMAIL_FROM'),
    to: getEnv('EMAIL_TO'),
    subject: getEnv('EMAIL_SUBJECT'),
    text: getEnv('EMAIL_TEXT'),
    html: getEnv('EMAIL_HTML')
  }
}

export const mailer = (): Mailer => new Mailer()
export const reducer = oncePerDayReducer