const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortId = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [] })
  .write();

const port = 8000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index', {
    name: 'Scout'
}));

app.get('/users', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}));

app.get('/users/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', (req, res) => {
    res.render('users/create');
})

app.get('/users/:id', (req, res)=>{
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();

    res.render('users/view', {user: user});
})

app.post('/users/create', (req, res) => {
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users'); 
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));