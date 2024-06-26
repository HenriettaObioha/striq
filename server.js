const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const { randomUUID } = require('crypto');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: "postgres://register_bin2_user:UgPZyCCcLgButrtm7uNMdszx0yN0ILiS@dpg-cpbp8urtg9os73cp7ta0-a.oregon-postgres.render.com/register_bin2",
  ssl: {
      rejectUnauthorized: true
    }
  }
});
//db.migrate.latest();

// Check if the 'clients' table exists before creating it
db.schema.hasTable('clients').then(exists => {
  if (!exists) {
    return db.schema.createTable('clients', function(table) {
      table.increments('id').primary();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  }
});

// Check if the 'service' table exists before creating it
db.schema.hasTable('service').then(exists => {
  if (!exists) {
    return db.schema.createTable('service', function(table) {
      table.uuid('id').primary();
      table.string('nameofservice').notNullable();
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.string('telephone').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  }
});

const app = express();

let intialPath = path.join(__dirname, "public");

app.use(express.static("public"));
app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.set('views', './views');

app.get('/index', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.get('/display', (req, res) => {
    res.sendFile(path.join(intialPath, "display.html"));
})

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(intialPath, "dashboard.html"));
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
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
            
            
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
            res.json(data);
        } else{
            res.json('email or password is incorrect');
        }
    })
})

app.post('/display-user', (req, res) => {
    const { nameofservice, email, address, telephone } = req.body;

    if(!nameofservice.length || !email.length || !address.length || !telephone.length){
        res.json('fill all the fields');
    } else{
        const ID = randomUUID()
        db("service").insert({
            id:ID,
            nameofservice: nameofservice,
            email: email,
            address: address,
            telephone: telephone,
        })
        .then(data => {

            res.send(ID.toString())
        })
        .catch(err => {
            console.log(err)
            
        })
    }
})

app.get('/dashboard-user/:id', (req, res) => {
    // const { nameofservice, email, address, telephone } = req.body;

    // if(!nameofservice.length || !email.length || !address.length || !telephone.length){
    //     res.json('fill all the fields');
    // } else{
        const ID = req.params.id
        db("service").where("id", ID)
        .then(data => {
            console.log(data)
            res.render("dashboard", {users:data})
        })
        .catch(err => {
            console.log(err)
            
        })
    }
)
app.listen(5432, (req, res) => {
    console.log('listening on port 5432......')
})
