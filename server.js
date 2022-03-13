// requrie module import
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const admin = require('firebase-admin')

//firebase admin setup
let serviceAccount = require("./ecom-website-48d60-firebase-adminsdk-19kpo-75fb6e9bb3.json");



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

//declare static path
let staticPath = path.join(__dirname, "front-end")

//initializing express.js
const app = express();


//middlewares
app.use(express.static(staticPath));
app.use(express.json()); //to enable data sharing

//routes
//home rout

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})


//Get Request for Signup Page

app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"))
})

app.post('/signup', (req, res) => {
    let { naam, email, password, number } = req.body;

    //form validation from backend side
    if (naam.length < 3) {
        return res.json({ 'alert': 'name must be 3 letters long' });
    }
    else if (!email.length) {             // ! is boolean which means having value true or false
        return res.json({ 'alert': 'Enter your email' });
    }
    else if (password.length < 8) {
        return res.json({ 'alert': 'Password should be 8 letter long' });

    }
    else if (!Number(number) || number.length < 10) {
        return res.json({ 'alert': 'invalid number , please enter valid one' });
    }

    // Store user in db
    db.collection('users').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({ 'alert': 'email alredy exists' });
            }
            else {
                //encrypt the password before storing it.
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users').doc(email).set(req.body)
                            .then(data => {
                                res.json({
                                    naam: req.body.naam,
                                    email: req.body.email
                                })
                            })
                    })
                })
            }
        })

})

//login route

app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"))
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if (!email.length || !password.length) {
        return res.json({ 'alert': 'fill all the inputs' });
    }

    db.collection('users').doc(email).get()
        .then(user => {
            if (!user.exists) { //if email does not exists
                return res.json({ 'alert': 'log in email does not exists' })
            }
            else {
                bcrypt.compare(password, user.data().password, (err, result) => {
                    if (result) {
                        let data = user.data();
                        return res.json({
                            naam: data.naam,
                            email: data.email,

                        })

                    }
                    else {
                        return res.json({ 'alert': 'password is incorrect' })
                    }
                })
            }
        })
})

app.listen(3000, () => {
    console.log("listening on port 3000....");
})