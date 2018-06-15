import csvparse = require('csv-parse')
import { ICsvLine } from './entities'

export class CsvParser {
  static async parseCsvBuffer(buffer: Buffer): Promise<ICsvLine[]> {
    try {
      return await new Promise<ICsvLine[]>((resolve, reject) => {
        const csvParser = csvparse({ from: 2 })
        const output: ICsvLine[] = []
        csvParser.on('readable', () => {
          let record = csvParser.read()
          while (record) {
            output.push(<ICsvLine>(record.slice(0, 4)))
            record = csvParser.read()
          }
        })
        csvParser.on('finish', () => {
          resolve(output)
        })
        csvParser.on('error', (err: any) => {
          reject(err)
        })
        csvParser.write(buffer)
        csvParser.end()
      })
    } catch (e) {
      throw new ParsingCsvFailedException(e.message)
    }
  }
}

export class ParsingCsvFailedException extends Error {

}




