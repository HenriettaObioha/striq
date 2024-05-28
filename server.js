const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Henrie$12',
        database: 'register'
    }
})
//db.migrate.latest();

const app = express();

let intialPath = path.join(__dirname, "public");

app.use(express.static("public"));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.post('/register-user', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if(!firstname.length || !lastname.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("clients").insert({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select("*")
    .from('clients')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})