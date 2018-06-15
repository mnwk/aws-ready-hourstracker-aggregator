import test from 'ava'
import { TimeTrackingList } from '../../../src/entities/TimeTrackingList'
import { timeTrackingLineFixture } from '../../fixtures/fixtures'
import { IReducerFunction, ITimeTrackingLine } from '../../../src/entities/entities'

test('happy path', t => {
  const fixtures = [
    {
      ...timeTrackingLineFixture
    },
    {
      ...timeTrackingLineFixture,
      startTime: '13:22',
      endTime: '15:05',
      sortKey: '2018-04-24T13:22'
    },
    {
      ...timeTrackingLineFixture,
      startTime: '07:22',
      endTime: '09:05',
      sortKey: '2018-04-24T07:22'
    }
  ]

  const expected = [
    {
      ...timeTrackingLineFixture,
      startTime: '07:22',
      endTime: '09:05',
      sortKey: '2018-04-24T07:22'
    },
    {
      ...timeTrackingLineFixture
    },
    {
      ...timeTrackingLineFixture,
      startTime: '13:22',
      endTime: '15:05',
      sortKey: '2018-04-24T13:22'
    }
  ]
  const list = new TimeTrackingList(fixtures)
  t.deepEqual(list.getListArray(), expected)
})

test('filter', t => {
  const fixtures = [
    {
      ...timeTrackingLineFixture
    },
    {
      ...timeTrackingLineFixture,
      startTime: '13:22',
      endTime: '15:05',
      sortKey: '2018-04-24T13:22',
      project: 'someThing'
    }
  ]
  const list = new TimeTrackingList(fixtures)
  list.filterByProject('Project1')
  t.deepEqual(list.getListArray(), [ timeTrackingLineFixture ])
})

test('reducer', t => {
  const fixtures = [
    {
      ...timeTrackingLineFixture
    },
    {
      ...timeTrackingLineFixture,
      startTime: '13:22',
      endTime: '15:05',
      sortKey: '2018-04-24T13:22'
    }
  ]

  const expected = [
    {
      ...timeTrackingLineFixture,
      project: 'new'
    },
    {
      ...timeTrackingLineFixture,
      startTime: '13:22',
      endTime: '15:05',
      sortKey: '2018-04-24T13:22',
      project: 'new'
    }
  ]
  const list = new TimeTrackingList(fixtures)
  const reducer: IReducerFunction = (carry: ITimeTrackingLine[], item: ITimeTrackingLine, ...args: any[]): ITimeTrackingLine[] => {
    carry.push({
      ...item,
      project: 'new'
    })
    return carry
  }
  list.reduce(reducer)

  t.deepEqual(list.getListArray(), expected)
})