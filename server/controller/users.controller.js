///var User = require('../model/User');
const User = require('../model/User'); //llamando al modelo para guardar

const passport = require('passport');

// para INICIAR SESION
exports.signin = passport.authenticate("local", {
    // successRedirect: '/notes', //para notas
    successRedirect: '/index', //para personas
    failureRedirect: '/users/signin',
    failureFlash: true
});

exports.userSignin = (req, res) => {
    res.render('users/signin.hbs');
};

exports.userSignup = (req, res) => {
    res.render('users/signup.hbs');
};

exports.singup = async (req, res) => {
    let errors = [];
    const { 
            surname_pat, 
            surname_mat, 
            first_names,
            area,
            type_document, 
            document, 
            password, 
            confirm_password, 
            email               
            } = req.body;
    if (password != confirm_password) {
      errors.push({ text: "Passwords do not match." });
    }
    if (password.length < 4) {
      errors.push({ text: "Passwords must be at least 4 characters." });
    }
    if (errors.length > 0) {
      res.render("users/signup.hbs", {
        surname_pat, 
        surname_mat, 
        first_names,
        area, 
        type_document, 
        document, 
        password, 
        confirm_password, 
        email
      });
    } else {
      // Look for email coincidence
      const emailUser = await User.findOne({ email: email });
      if (emailUser) {
        req.flash("error_msg", "The Email is already in use.");
        res.redirect("/users/signup");
      } else {
        // Saving a New User
        const newUser = new User({ 
            surname_pat, 
            surname_mat, 
            first_names,
            area, 
            type_document, 
            document, 
            password, 
            confirm_password, 
            email 
        });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash("success_msg", "You are registered.");
        res.redirect("/users/signin");
      }
    }
};

exports.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out now.");
    res.redirect("/users/signin");
  };