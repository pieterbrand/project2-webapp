const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => 
{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/add').post((req, res) =>
{
    const firstname = req.body.firstname;
    const age = Number(req.body.age);
    const cellNum = req.body.cellNum;
    const birth = Date.parse(req.body.birth);

    const newUser = new User(
        {
            firstname,
            age,
            cellNum,
            birth,
        });

    newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error: '+ err))
});

module.exports = router;