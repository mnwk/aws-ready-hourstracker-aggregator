import { ICsvLine, ITimeTrackingLine } from './entities'

export class Transformer {
  static transform(array: ICsvLine[]): ITimeTrackingLine[] {
    return array
      .map((item): ITimeTrackingLine => {
        const [ projectString, startString, endString, duration ] = item
        const startDate = Transformer.createDateFromString(startString)
        const endDate = Transformer.createDateFromString(endString)
        const sortKey = Transformer.createSortKey(startString)
        const date = Transformer.createDateString(startString)
        return {
          sortKey,
          date,
          startTime: startString.split(' ')[ 1 ],
          endTime: endString.split(' ')[ 1 ],
          duration,
          durationInMinutes: (endDate.getTime() - startDate.getTime()) / 1000 / 60,
          project: projectString
        }
      })
  }

  static createDateFromString(dateString: string): Date {
    const [ date, time ] = dateString.split(' ')
    const [ day, month, year ] = date.split('.')
    const [ hour, minute ] = time.split(':')
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`)
  }

  static createSortKey(dateString: string): string {
    const [ date, time ] = dateString.split(' ')
    const [ day, month, year ] = date.split('.')
    const [ hour, minute ] = time.split(':')
    return `${year}-${month}-${day}T${hour}:${minute}`
  }

  static createDateString(dateString: string): string {
    const [ date ] = dateString.split(' ')
    const [ day, month, year ] = date.split('.')
    return `${day}.${month}.${year}`
  }
}