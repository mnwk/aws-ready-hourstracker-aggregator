import { ICsvLine, ITimeTrackingLine } from '../../src/entities/entities'

export const csvDateFixture = '24.04.2018 10:22'

export const csvLineFixture: ICsvLine = [ 'Project1', '24.04.2018 10:22', '24.04.2018 12:05', '1:43' ]

export const timeTrackingLineFixture: ITimeTrackingLine = {
  date: '24.04.2018',
  startTime: '10:22',
  endTime: '12:05',
  duration: '1:43',
  durationInMinutes: 103,
  project: 'Project1',
  sortKey: '2018-04-24T10:22'
}