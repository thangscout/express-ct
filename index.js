const express = require('express');
const app = express();

const port = 8000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var users = [
    {id : 1, name: 'Thang'},
    {id : 2, name: 'Hung'}
]

app.get('/', (req, res) => res.render('index', {
    name: 'Scout'
}));

app.get('/users', (req, res) => res.render('users/index', {
    users: users
}));

app.get('/users/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = users.filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', (req, res) => {
    res.render('users/create');
})

app.post('/users/create', (req, res) => {
    users.push(req.body);
    res.redirect('/users'); 
})
app.listen(port, () => console.log(`Server listening on port ${port}!`));