const User = require("./../model/UserModel");
const bcrypt = require("bcrypt");
const config = require("./../config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/* ************** REGISTER *********************** */

exports.register = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(200).json({ message: "Email already registered" });
      }

      if(!validateEmail(req.body.email)){
        console.log('Email invalid')
        return res.status(200).json({ message: "Email address is not valid" });
      }


    })
    .catch((err) => { return res.status(200).json({ message: err })});

  User.create({email:req.body.email,password:req.body.password})
    .then((result) => 
     res.status(201).json({
        status: "success",
        user: result,
        message: "You are succefully register",
      })
    )
    .catch((err) => {
      console.log(err)
          return res.status(400).json({
          status: "fail",
          message: err,
        })
      
      
    });
};
/* ************** Login *********************** */
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (response) {
          const id = user._id;
          const token = jwt.sign({ id }, config.TOKEN_SECRET, {
            expiresIn: 3000, //30 min
          });
          req.session.user = user;
          res.json({ auth: true, token, user: user });
        } else {
          res.json({ auth: false, message: "Password does not match" });
        }
      });
    } else {
      res.json({ auth: false, message: "cant find username with this name" });
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

exports.verifyJWT = (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("you need a token, please login ");
  } else {
    jwt.verify(token, config.TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.json({ auth: false, message: "you faild to login" });
      } else {
        req.userId = decode.id;
        res.json({ auth: true, user: req.userId });
      }
    });
  }
};


/* ************** Forget PASSWORD *********************** */

exports.forgetPassword = async (req, res) => {
  
  try{

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "itssazeez@gmail.com",
        pass: "Sidz@1786",
      },
    });

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        return res.status(200).json({ err });
      }
     
      const token = buffer.toString("hex");
      const expireToken = Date.now() + 3600000;

      let user = await User.findOneAndUpdate(
        {email:req.body.email},
        {$set: {"resetToken" : token,"expireToken":expireToken}},
        {new : true}
        );

        if(!user){
          return res.status(201).json({ message: "Sorry no such mail exists" });
        }

        const mailOptions = {
          from: "itssazeez@gmail.com",
          to: req.body.email,
          subject: "Forget password ",
          html: `<p>Click on this <a href='http://localhost:3000/reset-password/${token}'>link</a> to reset password</p>`,
        };

         // Send email 📧  and retrieve server response
         transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return res.status(400).json({ error });
          } 
        });

        res.status(201).json({ message: "Please check your mail box", user });
    });

  }catch (err){
    res.status(500).json({ err, message:'Sorry could not find the user' });
  } 
};

/* ************** RESET PASSWORD *********************** */

exports.resetPassword = (req, res) => {
  const { token, password: newPassword } = req.body;

  bcrypt.hash(newPassword, 12, function (err, hash) {

  User.findOneAndUpdate(
    { resetToken: token, expireToken: { $gt: Date.now() } },
    {$set: {"resetToken" : undefined,"expireToken":undefined,"password":hash}},
    {new : true}
    )
    .then((user) => {
      if (!user) {
        return res
          .status(200)
          .json({ message: "Session has expired please genrate link again" });
      }
      res.status(200).json({ message: "Password updated"}) ;
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "System fail to update password , please report" })
    );
  });
};
//Permission to iamazeez/document-management-system.git denied to Hasnain-
