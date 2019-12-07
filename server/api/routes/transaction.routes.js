const Transaction = require('../../models/transactions.models')
const mongoose = require('mongoose')

module.exports = function (router) {

    // ! Fetching transaction records of all users
    router.get('/transaction/all', function (req, res) {
        Transaction.find({})
            .sort({ 'transactionDate': 1 })
            .exec()
            .then(docs =>
                docs === null
                    ? res.status(204).json({
                        message: 'Success, No transaction records found',
                        data: docs
                    })
                    : res.status(200).json({
                        message: 'Success',
                        data: docs
                    }))
            .catch(err => res.status(500).json({
                message: 'Internal Server Error while finding the Transaction records',
                error: err
            }))
    })
    // ! Fetching transaction records of all users

    // ! Fetching transaction all records of a particular user
    router.get('/transaction/all/:userId', function (req, res) {
        const userId = req.params.userId
        const qry = {
            userId: mongoose.Types.ObjectId(userId),
        }
        Transaction.find(qry)
            .sort({ 'transactionDate': 1 })
            .exec()
            .then(docs =>
                docs === null
                    ? res.status(204).json({
                        message: 'Success, No transaction records found',
                        data: docs
                    })
                    : res.status(200).json({
                        message: 'Success',
                        data: docs
                    }))
            .catch(err => res.status(500).json({
                message: 'Internal Server Error while finding the Transaction records',
                error: err
            }))
    })
    // ! Fetching transaction all records of a particular user

    // ! Fetching transaction records using year and month values
    router.get('/transaction/:year/:month', function (req, res) {
        const userId = req.get('userId')
        const month = req.params.month - 1
        const year = req.params.year
        const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0))
        const endDate = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))
        const qry = {
            userId: userId,
            transactionDate: {
                $gte: startDate,
                $lt: endDate
            }
        }
        Transaction.find(qry)
            .sort({ 'transactionDate': 1 })
            .exec()
            .then(docs =>
                docs === null
                    ? res.status(204).json({
                        message: 'Success, No transaction records found',
                        data: docs
                    })
                    : res.status(200).json({
                        message: 'Success',
                        data: docs
                    }))
            .catch(err => res.status(500).json({
                message: 'Internal Server Error while finding the Transaction records',
                error: err
            }))
    })
    // ! Fetching transaction records using year and month values

    // ! Fetch the transactions running balance for a particular user
    router.get('/transaction/balance/:year/:month', function (req, res) {
        const userId = req.get('userId')
        const month = req.params.month - 1
        const year = req.params.year
        const endDate = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))
        const pipeLine = [
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId)
                }
            },
            {
                $match: {
                    transactionDate: {
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    charges: {
                        $sum: '$charge'
                    },
                    deposits: {
                        $sum: '$deposit'
                    }
                }
            }
        ]
        Transaction.aggregate(pipeLine)
            .exec()
            .then(docs =>
                docs === null
                    ? res.status(204).json({
                        message: 'Success, No transaction records found',
                        data: docs
                    })
                    : res.status(200).json({
                        message: 'Success',
                        data: docs
                    }))
            .catch(err => res.status(500).json({
                message: 'Internal Server Error while finding the Transaction balance records of the user',
                error: err
            }))
    })
    // ! Fetch the transactions running balance for a particular user

    // ! Create a New Transaction
    router.post('/transaction/new', function (req, res) {
        let transaction = new Transaction(req.body)
        transaction.save(function (err, transaction) {
            err
                ? res.status(500).json({
                    message: 'Transaction Creation Failed',
                    error: err
                })
                : res.status(200).json({
                    message: 'Success',
                    data: transaction
                })
        })
    })
    // ! Create a New Transaction
}