const Product = require('../model/product.model')

//GET /api/v1/products ดู Products ทั้งหมด
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: products 
        });

    } catch (error) {
        return res.status(500).json ({
            status: 500,
            message: error.message,
            data:null
        });
    }
}

// GET /api/v1/products/:id (ดู Product ตาม Id)
exports.getProductsById = async (req, res) => {
try {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(400).json({
            status: 400,
            message: 'Product not found',
            data: null
        });
    }
    return res.status(200).json({
        status: 200,
        message: 'success',
        data: product
    });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.messsage,
            data: null
        });
    }
}

//POST /api/v1/products (เพิ่ม Product)
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock
        });

        return res.status(201).json({
            status: 201,
            message: 'success',
            data: newProduct
        })
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

//PUT /api/v1/products/:id 
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        if (!updatedProduct) {
            return res.status(400).json({
                status: 400,
                message: 'Product not found',
                data: null
            });
        } 
            return res.status(200).json ({
                status: 200,
                message: 'success',
                data: updatedProduct
            });
       
    } catch (eror) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
}

//DELETE 
exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(400).json({
                status: 400,
                message: 'Product not found',
                data: null
            });
        }

        return res.status(200).json({
            status:200,
            message: 'success',
            data: deleteProduct
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};