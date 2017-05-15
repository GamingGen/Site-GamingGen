'use strict';

// Récupération des schémas
let userSchema    = require('../Model/userSchema');
let sessionSchema = require('../Model/sessionSchema');


// Récupération des modules
const express       = require('express');
const router        = express.Router();
const crypto        = require('crypto');
const passport      = require('passport');
const nodemailer    = require('nodemailer');
const path          = require('path');
const fs            = require('fs');

// Confs
const cryptoSecret   = 'GamingGenCryptoCat';
const from           = `"Gaming Gen" <${process.env.NODEMAILER_MAIL}>`;
const subject        = 'Inscription à la Gaming Gen';
const GamingGen      = 'www.gaming-gen.fr';
const URLGamingGen   = `<a href="${GamingGen}">${GamingGen}</a>`;
const Facebook       = 'https://www.facebook.com/gaming.gen.festival';
const FacebookIMG    = `[host]/Img/General/facebookMail.png`;
const URLFacebook    = `<a href="${Facebook}"><img style="height:30px;" src="${FacebookIMG}" alt="${Facebook}"></a>`;
const Twitter        = 'https://twitter.com/gaminggenlan';
const TwitterIMG     = `[host]/Img/General/twitterMail.png`;
const URLTwitter     = `<a href="${Twitter}"><img style="height:30px;" src="${TwitterIMG}" alt="${Twitter}"></a>`;
const Instagram      = 'https://www.instagram.com/gaming_gen_festival';
const InstagramIMG   = `[host]/Img/General/instaMail.png`;
const URLInstagram   = `<a href="${Instagram}"><img style="height:30px;" src="${InstagramIMG}" alt="${Instagram}"></a>`;

const ButonURL       = `<a href="[lienBouton]"
                                style="background-color:#64DC13;
                                padding:14px 28px 14px 28px;
                                border-radius:3px;
                                line-height:18px!important;
                                letter-spacing:0.125em;
                                text-transform:uppercase;
                                font-size:13px;
                                font-family:'Open Sans',Arial,sans-serif;
                                font-weight:400;
                                color:#ffffff;
                                text-decoration:none;
                                display:inline-block;
                                line-height:18px!important" target="_blank" >I'm not a bot, bro</a>`;
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


// Récupération du template pour le mail
registrationHtml = fs.readFileSync(path.join(__dirname, '..', 'Template', 'templateMail.html'), 'utf8');


// create reusable transporter object using SMTP transport 
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_PASS
    }
});

function SendMail(req, res, mails, html, hash) {
  console.log('Sending Mail...'.info);
  
  // Gestion mail Inscription
  if (hash) {
    const host            = `${req.protocol}://${req.headers.host}`;
    const validationURL   = `${host}/#/users/validate/${hash}`;
    const validationLink  = `<a href="${validationURL}">${validationURL}</a>`;
    html = registrationHtml.replace('[lien]', validationLink)
                            .replace('[boutonValidation]', ButonURL)
                            .replace('[lienBouton]', validationURL)
                            .replace('[GamingGen]', URLGamingGen)
                            .replace('[Facebook]', URLFacebook)
                            .replace('[Twitter]', URLTwitter)
                            .replace('[Instagram]', URLInstagram)
                            .replace('[host]', `${host}`);
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
  transporter.sendMail(mailOptions, (error, info) => {
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

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy(err => {
    if (err) {
        return next(err);
    }
  });
  res.sendStatus(200);
});

// En cour de tests
router.get('/role/:id', (req, res) => {
    userSchema.findOne({_id: req.params.id})
    .populate('access.roles')
    .exec((err, docs) => {
      if (err) {
        console.error(err);
      }
      else {
        console.log(docs);
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

router.post('/insert', (req, res) => {
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
  
  newUser.save(err => {
    if (err) {
      console.error(err);
      res.status(500);
      if (err.message === 'There was a duplicate key error') {
        res.json({message : 'Utilisateur déjà existant'});
      }
      else {
        res.json({message : err});
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
 * Récupération de la liste de tous les utilisateurs
 */
router.get('/refresh', (req, res) => {
  req.session.reload(function(err) {
    res.status(200);
    res.end();
  })
});
/**
 * Récupération de la liste de tous les utilisateurs
 */
router.get('/listAll', (req, res) => {
  userSchema.find({}, {pseudo: 1, 'access.permissions': 1, 'access.ban': 1}, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.end();
    } else {
      res.json(docs);
    }
  });
});

/**
 * Récupération de la liste des utilisateurs non-bannis
 */
router.get('/listNoBan', (req, res) => {
  userSchema.find({'access.ban' : false}, {pseudo: 1}, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.end();
    } else {
      res.json(docs);
    }
  });
});

/**
 * Récupération de la liste des utilisateurs bannis
 */
router.get('/listBan', (req, res) => {
  userSchema.find({'access.ban' : true}, {pseudo: 1}, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.end();
    } else {
      res.json(docs);
    }
  });
});

/**
 * Bannissement d'un utilisateur
 */
router.post('/ban', (req, res) => {
   userSchema.findOneAndUpdate({_id : req.body.user.id}, {'access.ban' : true}, (err, docs) => {
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
router.post('/unban', (req, res) => {
  userSchema.findOneAndUpdate({_id : req.body.user.id}, {'access.ban' : false}, (err, docs) => {
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
router.post('/validate', (req, res) => {
  console.log("Validation d'un user...");
  console.log("req.body: ", req.body);
  userSchema.findOneAndUpdate({'access.validationKey': req.body.hash}, {'access.validationKey': '', 'access.level': 1}, (err, docUpdated) => {
    if (err) {
      console.log("Validate first error : " + err);
      res.status(500);
      res.end();
    } else {
      if (docUpdated !== null) {
        req.body = {
          "email": docUpdated.email,
          "password": docUpdated.password
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
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      res.status(401);
      // res.json({ message : err});
      // res.end();
      return next(err);
    }
    if (err) {
      console.log(err);
      res.status(500);
      return next(err);
    }
    req.logIn(user, err => {
      if (err) {
        console.log(err);
        res.status(500);
        return next(err);
      }
      res.json(user);
    });
  })(req, res, next);
}

// ------------------------------ Events ------------------------------
var userEvent = ServerEvent => {
  ServerEvent.on('isMailExist', (email, socket) => {
    email = email.toLowerCase();
    userSchema.findOne({email: email}, (err, doc) => {
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
  
  ServerEvent.on('isPseudoExist', (pseudo, socket) => {
    userSchema.findOne({pseudo: pseudo}, (err, doc) => {
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
  
  ServerEvent.on('UpdateUserPermissions', (data, socket) => {
    let socketIds = [];
    
    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user && socket.request.session.passport.user.permissions
    && socket.request.session.passport.user.permissions.includes('canAddUserPermission')
    && socket.request.session.passport.user.permissions.includes('canRemoveUserPermission')) {
      userSchema.findOneAndUpdate({_id: data._id}, {'access.permissions': data.permissions}, {new: true}, (err, docUpdated) => {
        if (err) {
          ServerEvent.emit('ErrorOnUserPermissionsUpdated', err.message, socket);
        }
        else {
          sessionSchema.find({session: { "$regex": data._id, "$options": "i" }}, {}, (err, docs) => {
            if (err) {
              ServerEvent.emit('ErrorOnUserPermissionsUpdated', err.message, socket);
            }
            else {
              docs.forEach(function (session) {
                session = session.toObject();
                session = JSON.parse(session.session);
                if (session.passport && session.passport.user && session.passport.user.socketId) {
                  socketIds.push(session.passport.user.socketId);
                }
              });
                if (socketIds.length > 0) {
                  ServerEvent.emit('UserPermissionsUpdated', docUpdated, socketIds, socket);
                }
                else {
                  ServerEvent.emit('ErrorOnUserPermissionsUpdated', `Socket de l'user non trouvé`, socket);
                }
                socketIds = [];
            }
          });
        }
      });
    }
    else {
      ServerEvent.emit('ErrorOnUserPermissionsUpdated', 'You are not Authorized', socket);
    }
  });
};


exports.userEvent = userEvent;
exports.router = router;
exports.userSchema = userSchema;