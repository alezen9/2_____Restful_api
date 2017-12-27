/*
initially json file should be like this

{
	"users": [],
	"id": 0
}

*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
var fs = require('fs');

module.exports = router;


//create new user (funzionante)
router.post('/',function(req,res){
	var utente = [];
	utente.name = req.body.name;
	utente.email = req.body.email;
	utente.password = req.body.password;
		fs.readFile('./data.json', 'utf-8', function(err, data) {
			if (err) throw err;
			var arrayOfObjects = JSON.parse(data);
			arrayOfObjects.id = arrayOfObjects.id +1;
			arrayOfObjects.users.push({
				name: utente.name,
				email: utente.email,
				password: utente.password,
				id: arrayOfObjects.id
			})		
			fs.writeFile('./data.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', function(err) {
			if (err) throw err;
			console.log('Succesfully added user ' + utente.name);
			})
		})
		res.status(200).send('Succesfully added user ' + utente.name);
	});
/*
//returns all users in database
router.get('/',function(req,res){
	User.find({},function(err,users){
		if(err) return res.status(500).send("There was a problem finding the user.");
		res.status(200).send(users);
	});
});

//gets single user from database
router.get('/:id',function(req,res){
	User.findById(req.params.id,function(err,user){
		if(err) return res.status(500).send("There was a problem finding the user.");
		res.status(200).send(user);
	});
});

//delete user from database
router.delete('/:id',function(req,res){
	User.findByIdAndRemove(req.params.id,function(err,user){
		if(err) return res.status(500).send("There was a problem deleting the user.");
		res.status(200).send("User "+user.name+" was deleted.");
	});
});

//update single user in database
router.put('/:id',function(req,res){
	User.findByIdAndUpdate(req.params.id,req.body,{new: true},function(err,user){ //new: true because i want to be returned the updated value of user and not the old one
		if(err) return res.status(500).send("There was a problem updating the user.");
		res.status(200).send(user);
	});
});
*/