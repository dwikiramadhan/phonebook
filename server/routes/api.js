var express = require('express');
var router = express.Router();

var Phonebooks = require('../models/phonebooks')

router.post('/checkdata', function (req, res, next) {
    var { phone } = req.body;

    Phonebooks.exists({ phone }, (err, data) => {
        res.status(200).json(data)
    })

});

router.post('/phonebooks', function (req, res, next) {
    var { id, name, phone } = req.body;

    Phonebooks.create({ id, name, phone }, (err, data) => {
        res.status(201).json({
            success: true,
            message: "data have been added",
            data: data
        })
    })

});

router.get('/phonebooks', function (req, res, next) {
    Phonebooks.find(
        {})
        // .limit(3)
        // .sort({ 'id': -1 })
        .exec(function (err, data) {
            res.status(200).json({
                data
            })
        })

})

router.put('/phonebooks/:id', function (req, res, next) {
    var _id = req.params.id
    var { name, phone } = req.body
    Phonebooks.findByIdAndUpdate(_id, { name, phone }, { new: true }, (err, data) => {
        res.status(201).json({
            success: true,
            message: "data have been updated",
            data: data
        })
    })

})

router.delete('/phonebooks/:id', function (req, res, next) {
    var _id = req.params.id
    Phonebooks.findByIdAndRemove(_id, (err, data) => {
        res.status(201).json({
            success: true,
            message: "data have been deleted",
            data: data
        })
    })

})

module.exports = router;