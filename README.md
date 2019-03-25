# GPhotosApp
Google Photos REST API library for Google Apps scripts

Adding the library to your project
----------------------------------
GPhotosApp for Google Apps Script is made available as a script
library. This is how you add it to your project:

1. Select "Resources" > "Libraries..." in the Google Apps Script
editor.
2. Enter the project key (`M7RP1Hdti0BfRh6z0gqmWISI0h1vB8tqc`) in the
"Find a Library" field, and choose "Select". (If you have copied the
library, enter instead the project key of your copy.)
3. Select the highest version number, and choose GPhotosApp as the
identifier. (Do not turn on Development Mode unless you know what you
are doing. The development version may not work.)
4. Press Save. You can now use the GPhotosApp library in your code.

## Redirect URI

Before you can start authenticating against an OAuth2 provider, you usually need
to register your application with that OAuth2 provider and obtain a client ID
and secret. Often a provider's registration screen requires you to enter a
"Redirect URI", which is the URL that the user's browser will be redirected to
after they've authorized access to their account at that provider.

For this library (and the Apps Script functionality in general) the URL will
always be in the following format:

    https://script.google.com/macros/d/{SCRIPT ID}/usercallback

Where `{SCRIPT ID}` is the ID of the script that is using this library. You
can find your script's ID in the Apps Script code editor by clicking on
the menu item "File > Project properties".

## Usage

To use the library, you need the following code to be included in your project.
```js
clientId="OAUTH2_CLIENT_ID"
clientSecret="OAUTH2_CLIENT_SECRET"
GPhotosApp.init(clientId, clientSecret);
function run(){
//check if user already authenticated with OAuth2 
  if(!GPhotosApp.isAuthenticated()){
  //display the authentication link if not authenticated
  //link will be available at log and need to be open
  //user just need to follow the instruction and just rerun this code after it's done authenticate 
    Logger.log(GPhotosApp.doAuthentication());
    return 1;
  }
  // your program
}

function authCallback(request){
  return GPhotosApp.authCallback(request);
}
```

### Uploading image
```js
GPhotosApp.uploadPhoto(mediaBlob,mediaName); // for images or video () (image size limit, refer to https://developers.google.com/photos/library/guides/api-limits-quotas)
```

### Uploading image to album
```js
GPhotosApp.uploadPhotoToAlbum(mediaBlob,mediaName,googlePhotoAlbumId); // for images or video () (image size limit, refer to https://developers.google.com/photos/library/guides/api-limits-quotas)
```

### Logout (remove authenticated user)
```js
GPhotosApp.logout();
```

Depedencies
------------
1. apps-script-oauth2 - https://github.com/gsuitedevs/apps-script-oauth2
