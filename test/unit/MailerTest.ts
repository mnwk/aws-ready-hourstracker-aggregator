import test from 'ava'
import { ITransporter, Mailer } from '../../src/Mailer'
import { anything, instance, mock, verify, when } from 'ts-mockito'
import { IMailConfig } from '../../src/entities/entities'

test('mailer happy path', async t => {
  const transporter = mock(FakeTransporter)
  when(transporter.sendMail(anything(), anything())).thenCall((conf, callback) => {
    callback()
  })
  const mailer = new Mailer(instance(transporter))
  await mailer.send({
    from: 'me',
    to: 'you',
    html: 'html',
    text: 'text',
    subject: 'subject'
  })
  verify(transporter.sendMail(anything(), anything())).once()
  t.pass()
})

test('mailer fails', async t => {
  const transporter = mock(FakeTransporter)
  when(transporter.sendMail(anything(), anything())).thenCall((conf, callback) => {
    callback('some error')
  })
  const mailer = new Mailer(instance(transporter))
  await t.throws(mailer.send({
    from: 'me',
    to: 'you',
    html: 'html',
    text: 'text',
    subject: 'subject'
  }))
})

class FakeTransporter implements ITransporter {
  async sendMail(config: IMailConfig, callback: (err: any, info: any) => void): Promise<void> {
    return undefined;
  }
}
