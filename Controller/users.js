'use strict';

// Récupération des schémas
let userSchema = require('../Model/userSchema');


// Récupération des modules
const express       = require('express');
const router        = express.Router();
const crypto        = require('crypto');
const passport      = require('passport');
const nodemailer    = require('nodemailer');

// Confs
const cryptoSecret   = 'GamingGenCryptoCat';
const from           = `"Gaming Gen" <${process.env.NODEMAILER_MAIL}>`;
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

console.log('from: ', from, 'process.env.NODEMAILER_MAIL: ', process.env.NODEMAILER_MAIL);
// create reusable transporter object using SMTP transport 
const transporter = nodemailer.createTransport({
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
        console.error(error);
        res.status(500).json({message : `Problème lors de l'envoie du mail`});
      }
      else {
        console.log(`Message sent: ${info}`);
        res.status(200).json({message : 'Mail envoyé !'});
      }
  });
}




router.post('/login', login);

// passport.authenticate('local'), (req, res) => {
//   if (req.user) {
//     console.log('User: ' + req.user.pseudo + ' Connecté');
//     res.status(200);
//     res.end();
//   }
//   else {
//     res.status(401);
//     res.end();
//   }
// });

// router.post('/login', (req, res) => {
//   console.log('Bad Auth');
//   res.status(401);
// });

router.post('/logout', (req, res) => {
  console.log('req.user: ', req.user);
  req.logout();
  res.sendStatus(200);
});

// En cour de tests
router.get('/', (req, res) => {
    userSchema.findOne({pseudo: 'DarkTerra'}).populate('name').exec(function (err, docs) {
      if (err) {
        console.error(err);
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
      console.error(err);
      res.status(500);
      if (err.message === 'There was a duplicate key error') {
        res.json({message : 'Utilisateur déjà existant'});
      }
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
      console.error(err);
      res.status(500);
      res.end();
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
      console.error(err);
      res.status(500);
      res.end();
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
      console.error(err);
      res.status(500);
      res.end();
    } else {
      let serverEvent  = require('./ServerEvent');
      serverEvent.emit('BanUser', req.body.user);
      res.status(200);
      res.end();
    }
  });
});

/**
 * Dé-bannissement d'un utilisateur
 */
router.post('/unban', function(req, res) {
  userSchema.findOneAndUpdate({'pseudo' : req.body.user}, {'access.ban' : false}, function (err, rows) {
    if (err) {
      console.error(err);
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

/**
 * Validation d'un compte utilisateur
 */
router.post('/validate', function(req, res) {
  console.log("Validation d'un user...");
  console.log("req.body: ", req.body);
  userSchema.findOneAndUpdate({'access.validationKey': req.body.hash}, {'access.validationKey': '', 'access.level': 1}, function (err, rowUpdated) {
    if (err) {
      console.log("Validate first error : " + err);
      res.status(500);
      res.end();
    } else {
      if (rowUpdated !== null) {
        req.body = {
          "email": rowUpdated.email,
          "password": rowUpdated.password
        };
        res.status(200);
        res.end();
        // TODO quand le bypass de connexion sera implémenté
        /*login(req, res, function(err) {
          console.log("Validate second error : " + err);
          res.status(500);
          res.end();
        }, true);*/
      } else {
        console.log("Validation not complete");
        res.status(500);
        res.end();
      }
    }
  });
});

function login(req, res, next) {// Ajouter une option de bypass pour si le mot de passe est déjà crypté (validation de compte)
  passport.authenticate("local", function(err, user, info) {
    if (!user) {
      return res.status(401);
      // res.end();
    }
    if (err) {
      return next(err);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
}

// ------------------------------ Events ------------------------------
var userEvent = function(ServerEvent) {
  ServerEvent.on('isMailExist', function(email, socket) {
    email = email.toLowerCase();
    userSchema.findOne({email: email}, function (err, doc) {
      if (err) {
        console.error(err);
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
        console.error(err);
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
exports.userSchema = userSchema;