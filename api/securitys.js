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


routes.put('/securitys/:id', (req, res, next) => {
    const securityId = req.params.id;
    const securityProps = req.body;

    Recipe.findByIdAndUpdate({
        _id: securityId
    }, securityProps)
        .then(() => Recipe.findById({ _id: securityId }))
        .then((security) => res.status(202).json(security))
        .catch(next);
});

routes.delete('/securitys/:id', (req, res, next) => {
  const securityId = req.params.id;

  Security.remove({ _id: securityId })
    .then(() => {
        res.status(204).send();
    })
    .catch(next);
});


module.exports = routes;
