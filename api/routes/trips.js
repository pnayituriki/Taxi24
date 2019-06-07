const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Rider = require('../models/rider');
const Driver = require('../models/driver');
const Trip = require('../models/trip');

//GET the list of all Trips
router.get('/', (req, res, next) => {
    Trip.find()
        .select('driver rider fromPlace toPlace dateTime status _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                trips: docs.map( doc => {
                    return {
                        _id: doc._id,
                        driver: doc.driver,
                        rider: doc.rider,
                        fromPlace: doc.fromPlace,
                        toPlace: doc.toPlace,
                        status: doc.status,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/trips/' + doc._id
                        }
                    }
                }),
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//GET All Active Trip
router.get('/:state', (req, res, next) => {

    const state = req.params.state;
    Trip
        .find()
        .where('status').equals('true')
        .select('driver rider fromPlace toPlace dateTime status _id')
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json({
                    trip: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_Trips',
                        url: 'http://localhost:3000/trips'
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

//POST new trip
router.post('/', (req, res, next) => {
    const trip = new Trip({
        _id: mongoose.Types.ObjectId(),
        fromPlace: req.body.fromPlace,
        toPlace: req.body.toPlace,
        driver: req.body.driverId,
        rider: req.body.riderId
    });
    trip
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Update Data Of A Specific Trip
router.patch("/:tripId", (req, res, next) => {
    const id = req.params.tripId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.trpName] = ops.value;
    }
    Trip.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Trip updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/trips/' + id
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