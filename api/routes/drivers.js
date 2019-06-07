const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Driver = require('../models/driver');

//GET list of drivers
router.get('/', (req, res, next) => {

    Driver.find()
    .select('name location availability _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                drivers: docs.map(doc => {
                    return {
                        name: doc.name,
                        location: doc.location,
                        availability: doc.availability,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/drivers/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});


//GET specific driver by id

router.get('/:driverId', (req, res, next) => {
    const id = req.params.driverId;
    Driver.findById(id)
        .select('name location availability _id')
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json({
                    driver: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_DRIVERS',
                        url: 'http://localhost:3000/drivers'
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

//Add new Driver

router.post('/', (req, res, next) => {

    const driver = new Driver({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location,
        availability: req.body.availability
    });
    driver
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Driver Created Successfully',
                createdDriver: {
                    name: driver.name,
                    location: driver.location,
                    availability: driver.availability,
                    _id: driver._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/drivers/' + result._id
                    }
                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

//Delete A Driver
router.delete("/:driverId", (req, res, next) => {
    const id = req.params.driverId;
    Driver.remove({ _id: id })
    .exec()
        .then(result => {
            res.status(200).json({
                message: 'Driver has been deleted',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/drivers',
                    body: { name: 'String', location: 'String'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

//Update Data Of A Specific Driver
router.patch("/:driverId", (req, res, next) => {
    const id = req.params.driverId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.drvName] = ops.value;
    }
    Driver.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Driver updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/drivers/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;