var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://alik:alik@ds161346.mlab.com:61346/signaculum')

//Get All Orders
router.get('/orders', function (req, res, next) {
    db.orders.find(function (err, orders) {
        if (err) {
            res.send(err);
        }
        res.json(orders);
    });
});

//Get Single Order
router.get('/order/:id', function (req, res, next) {
    db.orders.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
});

//Save Order
router.post('/order', function (req, res, next) {
    var order = req.body;
    // console.log('backend:' + order);
    //Verify
    if (!order) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.orders.save(order, function (err, order) {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }
})

//Delete Order
router.delete('/order/:id', function (req, res, next) {
    db.orders.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
});

//Update Order
router.put('/order/:id', function (req, res, next) {
    var order = req.body;
    var updOrder = {};

    if (order.phone) {
        updOrder.name = order.name;
    }

    if (!updOrder) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.orders.update({ _id: mongojs.ObjectId(req.params.id) }, updOrder, {}, function (err, order) {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }
});

module.exports = router;