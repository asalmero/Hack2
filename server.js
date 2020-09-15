const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000);

const bcrypt = require('bcrypt');
const SATL_WORK_FACTOR = 10;

mongo.connect('mongodb://localhost/login',function(err, db){



if (err) throw err;
console.log('Conetado a la base de datos :D');
client.on('connection', function(socket){
let login = db.collection('login');
socket.on('submit', function (data) {

    let user = data.name;
    let pwd = data.password;

    if (user == '' || pwd == ''){ 
        console.log('alguien intento ingresar sin password xD');
    
}
else {
bcrypt.genSalt(SATL_WORK_FACTOR, function (err, salt) {
   if(err)throw err;
   bcrypt.hash(pwd,salt,function (err,hash) {
if (err)throw err;
pwd = hash;
login.insert({username: user, pwd}, function () {
    console.log('new user was signed up: '+user);
    console.log('Contraseña Protegida con MD5: '+pwd);
  
});
       });
});

}
});

    });

});