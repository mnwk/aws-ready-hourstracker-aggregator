export interface IMailConfig {
  from: string
  to: string
  subject: string
  text: string
  html: string
  attachments?: {
    filename: string
    content: string
    encoding: string
  }[]
}

export interface ITimeTrackingLine {
  project: string
  sortKey: string
  date: string
  startTime: string
  endTime: string
  duration: string,
  durationInMinutes: number
}

export type ICsvLine = [string, string, string, string]
export interface IReducerFunction {
  (carry: ITimeTrackingLine[], item: ITimeTrackingLine, ...args: any[]): ITimeTrackingLine[]
}