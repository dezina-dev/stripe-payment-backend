var multer = require('multer');
var Product = require("../models/product_schema");

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.filename + '-' + Date.now());
    }
});


//addproduct
module.exports.addproduct = async (req, res, next) => {
	console.log("req.body", req.body);
    let prod = new Product(req.body);
    prod.save().then(newprod => {
        res.status(200).send({ 
            status: 1,
            message: "Product added successfully",
            data: newprod
         });
    })
    .catch(
        err => {
            res.status(501).send({ 
                status: 0,
                message: "unable to add product", 
                data: err });
        }
    );
    // console.log("req.file.path", req.file.path)
    // var upload = multer({ storage: storage }).single('filename');

    // upload(req, res, (err) => {
    //     if (err) {
    //         res.status(400).send("Something went wrong!");
    //     }

    //     let prod = new Product();

    //     let productdata = JSON.parse(req.body.obj);
    //     console.log(productdata);

    //     prod.product_image = req.file.path;
    //     prod.product_name = productdata.product_name;
    //     prod.price = parseInt(productdata.price);
    //     prod.description = productdata.description;
    //     prod.quantity = parseInt(productdata.quantity);
    //     //prod.filename = req.file.path;

    //     let prod = new Product();
    //     prod.save().then(newprod => {
    //         res.status(200).send({ 
    //             status: 1,
    //             message: "Product added successfully",
    //             data: newprod
    //          });
    //     })
    //     .catch(
    //         err => {
    //             res.status(501).send({ 
    //                 status: 0,
    //                 message: "unable to add product", 
    //                 data: err });
    //         }
    //     );

    // });
};

//getallproduct
module.exports.getproducts = async (req, res, next) => {
	console.log("getallproducts");
	try {
        var products
		const searchQuery = req.query.search
	
		console.log("search", searchQuery, req.query)
        if(searchQuery !== "") {
            products = await Product.find({product_name: searchQuery});
        }
        else {
            products = await Product.find({});
        }
	
		res.status(200).send({
				status: 1,
				message: "",
				data: products
			});
	
	} catch (error) {
		res.status(500).send({
			status: 0,
			message: "Unable to fetch Products",
			data: error
		});
	}
};