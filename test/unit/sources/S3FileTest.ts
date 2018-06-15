import test from 'ava'
import { S3File } from '../../../src/sources/S3File'
import { anything, instance, mock, when } from 'ts-mockito'
import * as AWS from 'aws-sdk'
import * as fs from 'fs'
import * as util from 'util'

test('happy path', async t => {
  const mockedS3Client = mock(S3ClientMock)
  const fileContent = fs.readFileSync('test/fixtures/mailfixture.mail')
  when(mockedS3Client.getObject(anything())).thenReturn({ promise: () => Promise.resolve({ Body: fileContent }) })
  const s3 = new S3File('someBucketName', <AWS.S3>instance(mockedS3Client))
  const result = await s3.get('some')
  t.is(util.isBuffer(result), true, `wrong instance`)
})

test('no mock', async t => {
  const s3 = new S3File('someBucketName')
  await t.throws(s3.get('some'))
})

class S3ClientMock {
  getObject(params: any): any {
  }
}