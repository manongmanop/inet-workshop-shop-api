const User = require('../model/user.model')

// POST /api/v1/register
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: 'Email already exists',
                data: null
            });
        }

        const newUser = await User.create({
            username,
            email,
            password,
            isApproved: false
        });

        return res.status(201).json({
            status: 201,
            message: 'success',
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data:null
        });
    }
};

// POST /api/v1/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid credentials',
                data: null
            });
        }

        //เงื่อนไข Approve
        if (!user.isApproved) {
            return res.status(401).json({
                status: 401,
                message: 'Account i pending approval',
                date: null
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
};

  //PUT /api/v1/users/:id/approve
    exports.approveUser = async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { isApproved: true },
                { new: true }
            );

            if (!user) {
                return res.status(400).json({
                    status: 400,
                    message: 'User not found',
                    data: null
                });
            }

            return res.status(200).json({
                status:200,
                message: 'success',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
                data: null
            });
        }
    };