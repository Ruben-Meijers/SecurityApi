var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Security = require('../model/security.model');


routes.get('/securitys', function (req, res) {
    res.contentType('application/json');

    Security.find({})
        .then(function (securitys) {
            res.status(200).json(securitys);
        })
        .catch((error) => {
        res.status(400).json(error);
    });
});


routes.get('/securitys/:id', function (req, res) {
    res.contentType('application/json');
    Security.findOne({ _id: req.params.id })
        .then(function (securitys) {
            res.status(200).json(securitys);
        })
        .catch((error) => {
        res.status(400).json(error);
    });
});


routes.post('/securitys', function (req, res) {
    const b = req.body;

    const security = new Security({

        name: b.name,
        date : b.date,
        description : b.description,

    });
    security.save()
        .then(() => res.status(200).json(security))
    .catch((error) => res.status(400).json(security));

});


routes.put('/securitys/:id', function (req, res) {

    const b= req.body;

    const security = new Security({
        name: b.name,
        date : b.date,
        description : b.description,
    });
    Security.findOneAndUpdate({ _id: security._id }, { $set: {
        name: b.name,
        date : b.date,
        description : b.description,
    }}).then(() => res.status(200).json(Security))
    .catch((error) => {
        res.status(400).json(error);
    });

});

routes.delete('/securitys/:id', function (req, res) {

    Security.remove({"_id" :security._id})
            .then( res.status(200).json('OK'))
        .catch(res.status(400).json(error));
    });


module.exports = routes;