function init(clientId,clientSecret){
  initOAuth2(clientId,clientSecret);
}

function doAuthentication(){
  if (isAuthenticated()) {
    return getPhotoService().getAuthorizationUrl();
  } else {
    return "You already have access to this service.";
  }
}

function doForceAuthentication(){
   return getPhotoService().getAuthorizationUrl();
}

function isAuthenticated(){
  var photoService = getPhotoService();
  Logger.log(photoService.hasAccess());
  if (photoService.hasAccess()) 
    return true;
  return false;
}

function uploadRaw(imageBlob,imageName){
  var photoService = getPhotoService();
  if (isAuthenticated()) {
    var api = "https://photoslibrary.googleapis.com/v1/uploads";
    var headers = {
      "Authorization": "Bearer " + photoService.getAccessToken(),
      "Content-type": "application/octet-stream",
      "X-Goog-Upload-File-Name" : imageName,
      "X-Goog-Upload-Protocol": "raw"
    };
    var options = {
      "headers": headers,
      "method" : "POST",
      "muteHttpExceptions": true,
      "payload": imageBlob 
    };
    return UrlFetchApp.fetch(api, options).getContentText();
  }
}

function uploadPhoto(imageBlob,imageName) {
  var photoService = getPhotoService();
  if (isAuthenticated()) {
    var photoId=uploadRaw(imageBlob,imageName);
    var api="https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate";
    var headers = {
      "Authorization": "Bearer " + photoService.getAccessToken(),
      "Content-type": "application/json",
    };
    var payload ={
      "newMediaItems": [
        {
          "description": "",
          "simpleMediaItem": {
            "uploadToken": photoId
          }
        }
      ]
    }
    var options = {
      "headers": headers,
      "method" : "POST",
      "muteHttpExceptions": true,
      "payload": JSON.stringify(payload) 
    };
    var response = UrlFetchApp.fetch(api, options);
    return response.getContentText()
  } else {
    return doAuthentication();
  }
}

function uploadPhotoToAlbum(imageBlob,imageName,albumId) {
  var photoService = getPhotoService();
  if (isAuthenticated()) {
    var photoId=uploadRaw(imageBlob,imageName);
    var api="https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate";
    var headers = {
      "Authorization": "Bearer " + photoService.getAccessToken(),
      "Content-type": "application/json",
    };
    var payload ={
      "albumId": albumId,
      "newMediaItems": [
        {
          "description": "",
          "simpleMediaItem": {
            "uploadToken": photoId
          }
        }
      ]
    }
    var options = {
      "headers": headers,
      "method" : "POST",
      "muteHttpExceptions": true,
      "payload": JSON.stringify(payload) 
    };
    var response = UrlFetchApp.fetch(api, options);
    return response.getContentText()
  } else {
    return doAuthentication();
  }
}

function createAlbum(albumTitle){
  var photoService = getPhotoService();
  if (isAuthenticated()) {
    var api = "https://photoslibrary.googleapis.com/v1/albums";
    var headers = {
      "Authorization": "Bearer " + photoService.getAccessToken(),
      "Content-type": "application/octet-stream",
      "X-Goog-Upload-File-Name" : "",
      "X-Goog-Upload-Protocol": "raw"
    };
    var payload = {
      "album": {
        "title": title
      }
    };
    var options = {
      "headers": headers,
      "method" : "POST",
      "muteHttpExceptions": true,
      "payload": JSON.stringify(payload) 
    };
    var response = UrlFetchApp.fetch(api, options);
    return response.getContentText();
  } else {
    return doAuthentication();
  }
}