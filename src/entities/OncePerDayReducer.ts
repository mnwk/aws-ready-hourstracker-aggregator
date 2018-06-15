import { IReducerFunction, ITimeTrackingLine } from './entities'

export const oncePerDayReducer: IReducerFunction = (carry: ITimeTrackingLine[], item: ITimeTrackingLine, ...args: any[]): ITimeTrackingLine[] => {
  const existingEntryIndex = carry.findIndex(carryItem => carryItem.date === item.date)
  if (existingEntryIndex > -1) {
    const newDurationInMinutes = carry[ existingEntryIndex ].durationInMinutes + item.durationInMinutes
    carry[ existingEntryIndex ].durationInMinutes = newDurationInMinutes
    carry[ existingEntryIndex ].duration = Math.floor(newDurationInMinutes / 60) + ':' + ('0' + (newDurationInMinutes % 60)).slice(-2)
    carry[ existingEntryIndex ].endTime = item.endTime
  } else {
    carry.push(item)
  }
  return carry
}

