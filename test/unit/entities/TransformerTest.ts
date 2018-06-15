import test from 'ava'
import { Transformer } from '../../../src/entities/Transformer'
import { csvDateFixture, csvLineFixture, timeTrackingLineFixture } from '../../fixtures/fixtures'


test('createDateString', t => {
  const date = Transformer.createDateString(csvDateFixture) // 24.04.2018 10:22
  t.is(date, '24.04.2018')
})


test('createDateFromString', t => {
  const date = Transformer.createDateFromString(csvDateFixture) // 24.04.2018 10:22
  t.is(date.getHours(), 12) // UTC+2
  t.is(date.getMinutes(), 22)
  t.is(date.getMonth(), 3)
  t.is(date.getDate(), 24)
  t.is(date.getFullYear(), 2018)
})

test('createSortKey', t => {
  const date = Transformer.createSortKey(csvDateFixture) // 24.04.2018 10:22
  t.is(date, '2018-04-24T10:22')
})

test('transform', t => {
  // [ 'Project1', '24.04.2018 10:22', '24.04.2018 12:05', '1:43' ]
  const result = Transformer.transform([ csvLineFixture ])
  t.deepEqual(result, [timeTrackingLineFixture])
})