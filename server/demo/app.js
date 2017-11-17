//Import dependencies
var electron = require('electron');
var auth = require('../index.js');

//Import app
var app = electron.app;

//Initialize the application
app.on('ready', function()
{
  //Initialize the options
  var opt = { client_id: '396886cb334c10fa05cc', client_secret: '2ab56980ab768bb021baf2d361ebfa84c1768632' };

  //Handle the github authentication
  return auth(auth.providers.github, opt, function(error, token)
  {
    //Display the error
    console.log('Error: ');
    console.log(error);

    //Display the generated token
    console.log('Token: ');
    console.log(token);
  });
});