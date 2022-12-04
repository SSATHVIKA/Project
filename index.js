const express = require('express')
const app = express()
const port = 3000

const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");


var serviceAccount = require("./key.json");

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signinsubmit', (req, res) => {
  const email = req.query.email;
  const pwd = req.query.pwd;

  db.collection("Customers")
  .where("email", "==",email)
  .where("pwd","==",pwd)
  .get()
  .then((docs)=>{
      if(docs.size > 0){
          res.render("dashboard");
      }else{
          res.render("login");
      }
  });
});

app.get('/signupsubmit', (req, res) => {
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const email = req.query.email;
  const number = req.query.number;
  const pwd = req.query.pwd;
  db.collection('Customers').add({
    name : first_name+" "+last_name,
    email : email,
    Contact : number,
    pwd : pwd,
    
}).then(()=>{
    res.render("login");
});
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/profile1', (req, res) => {
    res.render('profile1');
});

app.get('/profile2', (req, res) => {
    res.render('profile2');
});

app.get('/profile3', (req, res) => {
    res.render('profile3');
});

app.get('/signout', (req, res) => {
    res.render('home');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});