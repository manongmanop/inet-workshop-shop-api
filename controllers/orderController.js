const Order = require('../model/orders.model');
const Product = require('../model/product.model');
const User = require('../model/user.model')

//GET /api/v1/orders ดู Orders ทุกรายการ
exports.getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'username email').populate('productId', 'name price');
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
}

//GET /api/v1/products/:id/orders ดู Order ที่ตรงกับ Product
exports.getOrdersByProduct = async(req, res) => {
    try {
        const orders = await Order.find({ productId: req.params.id }).populate('userId','username email');
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
}

//POST /api/v1/products/:id/orders ซื้อ Order ใน Product 
exports.createOrder = async (req, res) => {
    try{
        const productId = req.params.id;
        const { userId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({
                status:400,
                message: 'Product not found',
                data: null
            });
        }
        //Order เกินกว่าใน Stock Product
        if (quantity > product.stock) {
            return res.status(400).json({
                status: 400,
                message: 'ไม่สามารถซื้อ Order ได้ (Order เกินกว่าใน Stock Product)',
                data: null
            });
        }
        // หักจำนวน Stock สินค้า
        product.stock -= quantity;
        await product.save();

        //save Order
        const newOrder = await Order.create({
            userId,
            productId: product._id,
            price: product.price,
            quantity,
            totalPrice: product.price*quantity,
            status: 'completed'
        });

        return res.status(201).json({
            status: 201,
            message: 'success',
            data: newOrder
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
}