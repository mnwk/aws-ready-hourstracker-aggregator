import * as AWS from 'aws-sdk'

export class S3File {
  private readonly bucket: string
  private s3Client: AWS.S3

  constructor(bucket: string, s3Client?: AWS.S3) {
    if (!s3Client) {
      s3Client = new AWS.S3()
    }
    this.s3Client = s3Client
    this.bucket = bucket
  }

  public async get(id: string): Promise<AWS.S3.Body> {
    const params = {
      Bucket: this.bucket,
      Key: id
    }

    return (await this.s3Client.getObject(params).promise()).Body
  }
}