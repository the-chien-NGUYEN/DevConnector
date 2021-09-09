const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// @route POST api/users
// @desc Register user
// @access public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter an valid email address').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            
            const avatar = gravatar.url(eamil, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            const user = new User({
                name,
                email,
                avatar,
                password
            })
    
    
            // Return jsonwebtoken
            
            res.send('User route');
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }


    })

module.exports = router;