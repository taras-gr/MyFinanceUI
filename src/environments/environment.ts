export const environment = {
  production: false,
  baseApiUri: '<baseApiUri>',
  staticFilesDir: '/..',
  AWSCognito : {
    mandatorySignIn:true,
    region: '<region>',
    userPoolId: '<userPoolId>',
    userPoolWebClientId: '<userPoolWebClientId>',
    authenticationFlowType:'<authenticationFlowType>'
  },
  AzureADB2C : {
    clientId: '<clientId>',
    scope: '<scope>',
    grantType: '<grantType>'
  }
};