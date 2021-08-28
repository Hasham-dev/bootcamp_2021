import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as origin from '@aws-cdk/aws-cloudfront-origins';
import * as cf from '@aws-cdk/aws-cloudfront';

export class Step2DeployWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a bucket

    const bucket = new s3.Bucket(this, 'webisteBucket', {
      versioned: true
    })

    // create a CDN deploy to your website

    const distribution = new cf.Distribution(this, 'myDistStaticSite', {
      defaultBehavior: {
        origin: new origin.S3Origin(bucket)
      },
      defaultRootObject: 'index.html'
    })

    // print out the web endpoint to the terminal

    new cdk.CfnOutput(this, 'webEndpoint', {
      value: distribution.domainName
    })

    // uploading hardware data to the cloud bucket

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./myWebsite')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"]
    })
  }
}
