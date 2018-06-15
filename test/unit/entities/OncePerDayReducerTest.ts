import test from 'ava'
import { timeTrackingLineFixture } from '../../fixtures/fixtures'
import { oncePerDayReducer } from '../../../src/entities/OncePerDayReducer'
import { ITimeTrackingLine } from '../../../src/entities/entities'

test('first Entry', t => {
  const carry = []
  const result = oncePerDayReducer(carry, timeTrackingLineFixture)
  t.deepEqual(result, [ timeTrackingLineFixture ])
})

test('two days', t => {
  const carry = []
  const dayOne = { ...timeTrackingLineFixture }
  const dayTwo: ITimeTrackingLine = {
    ...timeTrackingLineFixture,
    date: '25.05.2018'
  }
  oncePerDayReducer(carry, dayOne)
  const result = oncePerDayReducer(carry, dayTwo)
  t.deepEqual(result, [ dayOne, dayTwo ])
})

test('two days', t => {
  const carry = []
  const dayOne = { ...timeTrackingLineFixture }
  const dayTwo: ITimeTrackingLine = {
    ...timeTrackingLineFixture,
    startTime: '10:00',
    endTime: '11:00',
    durationInMinutes: 60,
    duration: '1:00',
    date: '25.05.2018'
  }
  const dayThree: ITimeTrackingLine = {
    ...timeTrackingLineFixture,
    startTime: '12:00',
    endTime: '13:00',
    durationInMinutes: 60,
    duration: '1:00',
    date: '25.05.2018'
  }
  const expected = [
    dayOne,
    {
      ...timeTrackingLineFixture,
      startTime: '10:00',
      endTime: '13:00',
      durationInMinutes: 120,
      duration: '2:00',
      date: '25.05.2018'
    }
  ]
  oncePerDayReducer(carry, dayOne)
  oncePerDayReducer(carry, dayTwo)
  const result = oncePerDayReducer(carry, dayThree)
  t.deepEqual(result, expected)
})