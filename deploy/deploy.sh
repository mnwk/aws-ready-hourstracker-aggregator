#!/bin/bash
source deploy/config.sh
aws cloudformation package --template-file ${TMP_DIR}/${TEMPLATEFILE}  --output-template-file ${TMP_DIR}/${TEMPLATEFILE}.out  --s3-bucket ${S3BUCKETNAME} --s3-prefix ${S3BUCKETPREFIX} --force-upload --region ${AWSREGION} --profile ${AWSPROFILE}
aws cloudformation deploy --template-file ${TMP_DIR}/${TEMPLATEFILE}.out --stack-name ${STACKNAME} --capabilities CAPABILITY_IAM --region ${AWSREGION} --profile ${AWSPROFILE}