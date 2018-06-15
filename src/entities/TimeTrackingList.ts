import { IReducerFunction, ITimeTrackingLine } from './entities'

export class TimeTrackingList {
  private list: ITimeTrackingLine[]

  constructor(lines: ITimeTrackingLine[]) {
    this.list = lines.sort((left, right) => {
      if (left.sortKey < right.sortKey) return -1
      if (left.sortKey > right.sortKey) return 1
      return 0
    })
  }

  public filterByProject(name: string): TimeTrackingList {
    this.list = this.list.filter(item => item.project === name)
    return this
  }

  public reduce(reducer: IReducerFunction): TimeTrackingList {
    this.list = this.list.reduce(reducer, new Array<ITimeTrackingLine>())
    return this
  }

  public getListArray(): ITimeTrackingLine[] {
    return this.list
  }
}