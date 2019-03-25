var clientId="";
var clientSecret="";
function initOAuth2(clientId,clientSecret){
  this.clientId=clientId;
  this.clientSecret=clientSecret;
}
function getPhotoService() {
  //refer to https://github.com/gsuitedevs/apps-script-oauth2
  return OAuth2.createService('photoslibrary')
  .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
  .setTokenUrl('https://accounts.google.com/o/oauth2/token')
  .setClientId(this.clientId)
  .setClientSecret(this.clientSecret)
  .setCallbackFunction('authCallback')
  .setPropertyStore(PropertiesService.getUserProperties())
  .setScope('https://www.googleapis.com/auth/photoslibrary')
  .setParam('login_hint', Session.getActiveUser().getEmail())
  .setParam('access_type', 'offline')
  .setParam('approval_prompt', 'force');
}

function authCallback(request) {
  var photoService = getPhotoService();
  var isAuthorized = photoService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

function logout() {
  var service = getPhotoService();
  service.reset();
}
