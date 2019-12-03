const User = require('../../models/users.models')

module.exports = function (router) {

    // ! Fetch User By User ID
    router.get('/user/:id', function (req, res) {
        User.findById(req.params.id).exec()
            .then(docs =>
                docs === {}
                    ? res.status(204).json({
                        message: 'Success, No User found',
                        data: docs
                    })
                    : res.status(200).json({
                        message: 'Success',
                        data: docs
                    }))
            .catch(err => res.status(500).json({
                message: 'Internal Server Error while finding the User',
                error: err
            }))
    })
    // ! Fetch User By User ID

    // ! Fetch User by Email ID
    router.get('/user/email/:email', function (req, res) {
        User.find({ 'emailId': req.params.email }).exec()
            .then(docs =>
                docs === {}
                    ? res.status(204).json({
                        message: 'Success, No User found',
                        data: docs
                    })
                    : res.status(200).json({
                        message: 'Success',
                        data: docs
                    }))
            .catch(err => res.status(500).json({
                message: 'Internal Server Error while finding the User',
                error: err
            }))
    })
    // ! Fetch User by Email ID

    // ! Create a New User
    router.post('/new/user', function (req, res) {
        let user = new User(req.body)
        user.save(function (err, user) {
            err
                ? res.status(500).json({
                    message: 'User Creation Failed',
                    error: err
                })
                : res.status(200).json({
                    message: 'Success',
                    data: user
                })
        })
    })
    // ! Create a New User

    // ! Update an Exsisting User
    router.put('/user/:id', function (req, res) {
        let qry = { _id: req.params.id }
        let doc = {
            // firstName: req.body.firstName,
            // lastName: req.body.lastName,
            // emailId: req.body.emailId,
            // password: req.body.password,
            isActive: req.body.isActive,
            lastUpdatedOn: Date.now
        }
        User.update(qry, doc, function (err, resp) {
            err
                ? res.status(500).json({
                    message: 'User Updation Failed',
                    error: err
                })
                : res.status(200).json({
                    message: 'Success',
                    data: resp
                })
        })
    })
    // ! Update an Exsisting User
}