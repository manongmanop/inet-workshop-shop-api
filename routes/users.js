var express = require('express');
var router = express.Router();

//ดึง controller 
const { register, login, approveUser } = require('../controllers/authController')

//สมัครสมาชิก
router.post('/register', register);

//เข้าสู่ระบบ
router.post('/login', login);

//อนุมัติให้เข้าสู่ระบบได้
router.put('/users/:id/approve', approveUser);

module.exports = router;
