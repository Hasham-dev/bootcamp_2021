import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';

export class WorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define aws lambda resource
    const hello =  new lambda.Function(this, 'HelloWorldHandler', {
      runtime: lambda.Runtime.NODEJS_14_X, // execute enviroment
      code: lambda.Code.fromAsset('lambda'), // load lambda from lambda folder
      handler: 'hello.handler' // file is hello.js, function is handler
    })

    // define api gateway rest api resouce backed by our 'hello' function

    new apigw.LambdaRestApi(this, 'EndpointHelloWorld', {
      handler: hello
    })
  }
}
