const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Rider = require('../models/rider');

//GET list of riders
router.get('/', (req, res, next) => {
    
    Rider.find()
    .select('name phone _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                riders: docs.map(doc => {
                    return {
                        name: doc.name,
                        phone: doc.phone,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/riders/' + doc._id
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

//GET specific Rider by id
router.get('/:riderId', (req, res, next) => {
    const id = req.params.riderId;
    Rider.findById(id)
        .select('name phone _id')
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json({
                    rider: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_Riders',
                        url: 'http://localhost:3000/riders'
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

//Add new Rider
router.post('/', (req, res, next) => {
    const rider = new Rider({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone
    });
    rider
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Rider Created Successfully',
                createdRider: {
                    name: rider.name,
                    phone: rider.phone,
                    _id: rider._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/riders/' + result._id
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

//Remove/Delete a Scpecific Rider
router.delete("/:riderId", (req, res, next) => {
    const id = req.params.riderId;
    Rider.remove({ _id: id })
    .exec()
        .then(result => {
            res.status(200).json({
                message: 'Rider has been deleted',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/riders',
                    body: { name: 'String', phone: 'Number'}
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

//Update Data Of A Specific Rider
router.patch("/:riderId", (req, res, next) => {
    const id = req.params.riderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.rdrName] = ops.value;
    }
    Rider.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Rider updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/riders/' + id
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