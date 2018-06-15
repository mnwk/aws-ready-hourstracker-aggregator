[![Coverage Status](https://coveralls.io/repos/github/mnwk/aws-ready-hourstracker-aggregator/badge.svg?branch=develop)](https://coveralls.io/github/mnwk/aws-ready-hourstracker-aggregator?branch=develop)

### (almost) Ready to use Service for time tracking exports.
Receives mails with attached csv files via SES.
* extract attached csv file
* transform format
* sort & filter
* aggregation (multiple entries per day => one day)
* send result via email

#### Supported cvs format
```
"project-name","start","end","duration"
"Project1","01.11.2017 09:45","01.11.2017 10:47","1:07" 
```

## Installation
### Preparation
#### Yarn
Yes, you need it. Get it [here](https://yarnpkg.com)
#### AWS SES
1) Go to [AWS SES Domains settings](https://eu-west-1.console.aws.amazon.com/ses/home) and [verify your domain](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-domains.html).
(it is also possible to use subdomains here) This is will be the domain for receiving mails. `aws-postbox@my.domain.tld` 
For this you need to follow the steps and fiddle a bit in your domain settings (Route53 or your domain hoster 
of choice) And wait for the changes to be distributed... 

2) Go to "Email Addresses" and [verify the email address](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html) to which the result will be send. `my-normal-email@example.org`
You will get a verification mail with a verification link. You know how this works...
3) [Create an S3 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) for the CloudFormation
 deployment. The Bucket for incomming mails will be created later.

#### AWS CLI
Have your local [aws credentials set up](https://docs.aws.amazon.com/cli/latest/reference/configure/).

#### Local code
1) `git clone git@github.com:mnwk/aws-ready-hourstracker-aggregator.git`
2) Go to the `deploy` folder and copy/rename the two `.template` files
    ```
    cd deploy
    cp config.sh.template config.sh
    cp timesheets.cfn.yaml.template timesheets.cfn.yaml
    ```
3) Edit the new files to your needs. Only edit the Parameter section in the CloudFormation file.
* ProjectNameFilter depends on your time tracking app and settings (see "Supported cvs format")
* TracingSwitch enables/disables x-ray tracing (default off)

### Deployment
Hit `yarn deploy` and cross fingers.

### Activate RuleSet is AWS SES
Go to "Email Receiving"->"Rule Sets" and select "StoreToS3AndTriggerLambda". Klick on "Set as Acive Rule Set"

## Try out
You may now send a mail with the attached timetracking csv from you app to your aws-postbox email address. After some 
seconds you should receive a new email in you result postbox.

## Trouble shooting
* Have a look at [Cloudwatch](https://eu-west-1.console.aws.amazon.com/cloudwatch)->Logs and search for 
`/aws/lambda/HandleTimesheetsFunction`
* enable Tracing (TracingSwitch), redeploy and check [X-Ray](https://eu-west-1.console.aws.amazon.com/xray)
* **Deleting Stack**: make sure to disable "StoreToS3AndTriggerLambda" RuleSet in SES before deleting
