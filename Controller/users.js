'use strict';

// Récupération des schémas
let userSchema = require('../Model/userSchema');


// Récupération des modules
var express       = require('express');
var router        = express.Router();
var crypto        = require('crypto');
var passport      = require('passport');
var nodemailer    = require('nodemailer');

// Confs
const cryptoSecret   = 'GamingGenCryptoCat';
const from           = '"Gaming Gen" <noreply@gaming-gen.fr>';
const subject        = 'Inscription à la Gaming Gen';
let text             = '';
let registrationHtml = `
[logo GG]
<br/>
Hello,
<br/><br/>
Tu reçois cet e-mail car tu as créé un compte sur le site www.gaming-gen.fr.
<br/><br/>
Afin de confirmer ton adresse e-mail et de valider ton enregistrement, clique sur le bouton ci-dessous :
<br/>
[bouton]
<br/>
S'il ne fonctionne pas, copie ce lien et colle le dans la barre d'adresse de ton navigateur : [lien]
<br/><br/>
Une fois ton compte validé, tu pourras personnaliser ton profil, t'inscrire aux tournois, enregistrer ton équipe, réserver ta place, venir à la GG6, gagner tous tes matchs, devenir une star internationale et bien plus encore... 
<br/><br/>
A très vite !
<br/><br/>
Gaming Gen,
<br/>
Le Jeu est dans nos gènes.
<br/><br/>
--
Ce message a été envoyé automatiquement. Merci de ne pas répondre.
<br/>
[Footer] www.gaming-gen.fr [picto Facebook] [picto Twitter] [picto Instagram]`;


// create reusable transporter object using SMTP transport 
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});


function SendMail(req, res, mails, html, hash) {
  console.log('Sending Mail...'.info);
  
  // Gestion mail Inscription
  if (hash) {
    const validationLink = `${req.protocol}://${req.headers.host}/#/users/validate/${hash}`;
    html = registrationHtml.replace('[lien]', validationLink);
  }
  
  // setup e-mail data with unicode symbols 
  var mailOptions = {
      from: from, // sender address 
      to: mails, // list of receivers 
      subject: subject, // Subject line 
      text: text, // plaintext body 
      html: html, // html body
      attachments: []
  };
  
  // Pour attacher des pièces
  // for(let IMG of tabIMG) {
  //   attach = {};
  //   attach.filename = IMG;
  //   attach.path = IMG;
  //   mailOptions.attachments.push(attach);
  // }
  
  // send mail with defined transport object 
  transporter.sendMail(mailOptions, function(error, info) {
    console.log('info: ', info);
      if(error) {
        console.log(error);
        res.sendStatus(500);
      }
      else {
        console.log(`Message sent: ${info}`);
        res.sendStatus(200);
      }
  });
}




// router.post('/login', login);

// passport.authenticate('local'), (req, res) => {
//   if (req.user) {
//     console.log('User: ' + req.user.pseudo + ' Connecté');
//     res.sendStatus(200);
//   }
//   else {
//     res.sendStatus(401);
//   }
// });

// router.post('/login', (req, res) => {
//   console.log('Bad Auth');
//   res.sendStatus(401);
// });

router.post('/logout', (req, res) => {
  console.log(req.user);
  req.logout();
  res.sendStatus(200);
});

// En cour de tests
router.get('/', (req, res) => {
    userSchema.findOne({pseudo: 'DarkTerra'}).populate('name').exec(function (err, docs) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(docs);
      }
    });
});

// router.post('/update', function(req, res) {
//   userSchema.findOneAndUpdate({
//     req.params.oldParametterToFind: req.params.oldValueToFind
//   },
//   {
//     req.params.newParametterToFind: req.params.newValueToFind
//   },
//   function(err, user) {
//     console.log((user));
//   });
// });

router.post('/insert', function (req, res) {
  let hash = crypto.createHmac('sha256', cryptoSecret)
    .update(req.body.pseudo + req.body.email + Date.now())
    .digest('hex');
  
  let newUser = new userSchema({
    pseudo    : req.body.pseudo,
    password  : req.body.password,
    email     : req.body.email,
    general   : {
      first_name    : req.body.general.first_name,
      last_name     : req.body.general.last_name,
      birthday      : req.body.general.birthday,
      zip           : req.body.general.zip
    },
    access    : {
      validationKey : hash
    }
  });
  
  newUser.save(function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      // Envoit du mail
      SendMail(req, res, [newUser.email], text, hash);
    }
  });
});

/**
 * Récupération de la liste des utilisateurs non-bannis
 */
router.get('/listNoBan', function (req, res) {
  userSchema.find({'access.ban' : false}, function (err, rows) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
});

/**
 * Récupération de la liste des utilisateurs bannis
 */
router.get('/listBan', function (req, res) {
  userSchema.find({'access.ban' : true}, function (err, rows) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
});

/**
 * Bannissement d'un utilisateur
 */
router.post('/ban', function(req, res) {
   userSchema.findOneAndUpdate({'pseudo' : req.body.user}, {'access.ban' : true},function (err, rows) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      let serverEvent  = require('./ServerEvent');
      serverEvent.emit('BanUser', req.body.user);
      res.sendStatus(200);
    }
  });
});

/**
 * Dé-bannissement d'un utilisateur
 */
router.post('/unban', function(req, res) {
  userSchema.findOneAndUpdate({'pseudo' : req.body.user}, {'access.ban' : false}, function (err, rows) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

/**
 * Validation d'un compte utilisateur
 */
router.post('/validate', function(req, res) {
  console.log("Validation d'un user...");
  userSchema.findOneAndUpdate({'access.validationKey': req.body.hash}, {'access.validationKey': '', 'access.level': 1}, function (err, rowUpdated) {
    if (err) {
      console.log("Validate first error : " + err);
      res.sendStatus(500);
    } else {
      if (rowUpdated !== null) {
        req.body = {
          "email": rowUpdated.email,
          "password": rowUpdated.password
        };
        res.sendStatus(200);
        // TODO quand le bypass de connexion sera implémenté
        /*login(req, res, function(err) {
          console.log("Validate second error : " + err);
          res.sendStatus(500);
        }, true);*/
      } else {
        console.log("Validation not complete");
        res.sendStatus(500);
      }
    }
  });
});

function login(req, res, next) {// Ajouter une option de bypass pour si le mot de passe est déjà crypté (validation de compte)
  passport.authenticate("local", function(err, user, info) {
    console.log(info);
    if (!user) {
      return res.sendStatus(401);
    }
    if (err) {
      return next(err);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.end(JSON.stringify(user));
      // return res.sendStatus(200);
    });
  })(req, res, next);
}

// ------------------------------ Events ------------------------------
var userEvent = function(ServerEvent) {
  ServerEvent.on('isMailExist', function(email, socket) {
    email = email.toLowerCase();
    userSchema.findOne({email: email}, function (err, doc) {
      if (err) {
        console.log(err);
      }
      else if (doc != null && doc.email === email) {
        ServerEvent.emit('isMailExistResult', true, socket);
      }
      else {
        ServerEvent.emit('isMailExistResult', false, socket);
      }
    });
  });
  
  ServerEvent.on('isPseudoExist', function(pseudo, socket) {
    userSchema.findOne({pseudo: pseudo}, function (err, doc) {
      if (err) {
        console.log(err);
      }
      else if (doc != null && doc.pseudo === pseudo) {
        ServerEvent.emit('isPseudoExistResult', true, socket);
      }
      else {
        ServerEvent.emit('isPseudoExistResult', false, socket);
      }
    });
  });
};


exports.userEvent = userEvent;
exports.router = router;