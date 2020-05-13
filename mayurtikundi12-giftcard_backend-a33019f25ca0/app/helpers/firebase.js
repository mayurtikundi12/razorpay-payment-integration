const { exec } = require('child_process');

// for linux and mac
// let key_path = __dirname+"/" + 'service-account-file.json';
// let command = 'export GOOGLE_APPLICATION_CREDENTIALS='+'"'+key_path+'"';

// for windows
let key_path = __dirname+"\\" + 'service-account-file.json';
let command = 'set GOOGLE_APPLICATION_CREDENTIALS='+'"'+key_path+'"';

// console.log("command ",command)

exec(command, (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});

let admin = require('firebase-admin');
 
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://favouright-9a938.firebaseio.com'
});


module.exports = admin;

// function getUserInfoFromFirebase(uid){
//    admin.auth().getUser(uid)
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log('Successfully fetched user data:', userRecord.toJSON());
//     Promise.resolve(userRecord.toJSON())
//   })
//   .catch(function(error) {

//     console.log('Error fetching user data:', error);
//     Promise.reject(error);
//   });
// }

// getUserInfoFromFirebase("I6aqzipcfOY2HI2UETxTnX9IAtw1");

// module.exports.getUserInfoFromFirebase = getUserInfoFromFirebase ;



