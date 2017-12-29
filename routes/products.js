var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://alik:alik@ds161346.mlab.com:61346/signaculum')

//Get All Products
router.get('/products', function (req, res, next) {
    db.products.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.json(products);
    });
});

//Get Single Products
router.get('/details/:id', function (req, res, next) {
    db.products.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
});

//Save Product
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

//Delete Product
router.delete('/product/:id', function (req, res, next) {
    db.products.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
});

//Update Product
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