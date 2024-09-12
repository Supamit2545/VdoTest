// src/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route สำหรับเริ่มต้นการเข้าสู่ระบบด้วย Google
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'], // ระบุข้อมูลที่ต้องการจาก Google
    })
);

// Route สำหรับ callback เมื่อ Google ทำการ redirect กลับมา
router.get(
    '/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // เมื่อเข้าสู่ระบบสำเร็จ, ส่งผู้ใช้กลับไปที่ front-end
        res.redirect('http://localhost:5173'); // Redirect กลับไปที่หน้า Vite front-end
    }
);

router.get('/current-user', (req, res) => {
    if (req.user) {
        res.json(req.user); // ส่งข้อมูลผู้ใช้กลับไปที่ front-end
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        // ล้าง session หรือ cookies
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to destroy session' });
            }
            res.clearCookie('connect.sid'); // ลบ cookies ที่เกี่ยวข้องกับ session
            res.json({ message: 'Logged out successfully' });
        });
    });
});

module.exports = router;
