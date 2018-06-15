import test from 'ava'
import * as fs from 'fs'
import { CsvParser, ParsingCsvFailedException } from '../../../src/entities/CsvParser'

test('happy path', async t => {
  const attachment = fs.readFileSync('test/fixtures/attachment.csv')
  const csv = await CsvParser.parseCsvBuffer(attachment)
  t.is(csv.length, 13)
  t.deepEqual(csv.shift(), [ 'Project1', '24.04.2018 10:22', '24.04.2018 12:05', '1:43' ])
})

test('faulty csv file', async t => {
  const attachment = fs.readFileSync('test/fixtures/attachment_fail.csv')
  await t.throws(CsvParser.parseCsvBuffer(attachment), ParsingCsvFailedException)

})