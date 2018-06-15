import { IMailConfig } from './entities/entities'
import * as AWS from 'aws-sdk'
import * as nodemailer from 'nodemailer'

export class Mailer {
  private transporter: ITransporter

  constructor(transporter?: ITransporter) {
    if (!transporter) {
      transporter = nodemailer.createTransport({
        SES: new AWS.SES({ apiVersion: '2010-12-01' })
      })
    }
    this.transporter = transporter
  }

  public async send(config: IMailConfig): Promise<void> {
    await new Promise((resolve, reject) => {
      this.transporter.sendMail(config, (err: any, info: any) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }
}

export interface ITransporter {
  sendMail(config: IMailConfig, callback: (err: any, info: any) => void): Promise<void>
}
