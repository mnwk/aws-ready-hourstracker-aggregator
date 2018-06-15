import test from 'ava'
import { AttachmentNotFoundException, MimeExtractor } from '../../../src/sources/MimeExtractor'
import * as fs from 'fs'
import * as util from 'util'

test('happy path', t => {
  const fileContent = fs.readFileSync('test/fixtures/mailfixture.mail')
  const attachment = MimeExtractor.getAttachmentBuffer(fileContent, 'CSVExport.csv')
  t.is(util.isBuffer(attachment), true)
})

test('notFound', t => {
  const fileContent = fs.readFileSync('test/fixtures/mailfixture.mail')
  t.throws(() => MimeExtractor.getAttachmentBuffer(fileContent, 'notFound.csv'), AttachmentNotFoundException)
})