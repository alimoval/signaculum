var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://alik:alik@ds161346.mlab.com:61346/signaculum');
const passport = require('passport');

// Get All Orders
router.get('/orders', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    db.orders.find(function (err, orders) {
        if (err) {
            res.send(err);
        }
        res.json(orders);
    });
});

// Get Orders By Phone
router.get('/ordersByPhone/:phone', function (req, res, next) {
    db.orders.find({ phone: /req.params.phone/ }, function (err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
});

// Get Single Order
router.get('/order-details/:id', function (req, res, next) {
    db.orders.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
});

// Save Order
router.post('/order', function (req, res, next) {
    var order = req.body;

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
});

// Delete Order
router.delete('/order/:id', function (req, res, next) {
    db.orders.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, order) {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
});

// Update Order
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

// Get All Products
router.get('/products', function (req, res, next) {
    db.products.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.json(products);
    });
});

// Get Single Products
router.get('/order-form/:id', function (req, res, next) {
    db.products.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
});

// Save Product
router.post('/product', function (req, res, next) {
    var product = req.body;
    //Verify
    if (!product.name) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.products.save(product, function (err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
})

// Delete Product
router.delete('/product/:id', function (req, res, next) {
    db.products.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
});

// Update Product
router.put('/product/:id', function (req, res, next) {
    var product = req.body;
    var updProduct = {};

    if (product.phone) {
        updProduct.name = product.name;
    }

    if (!updProduct) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.products.update({ _id: mongojs.ObjectId(req.params.id) }, updProduct, {}, function (err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
});

module.exports = router;