const express = require('express');
const shortId = require('shortid');

const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}));

router.get('/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
});

router.get('/create', (req, res) => {
    res.render('users/create');
})

router.get('/:id', (req, res)=>{
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();

    res.render('users/view', {user: user});
})

router.post('/create', (req, res) => {
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users'); 
})

module.exports = router;