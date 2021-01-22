const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me 
// @desc    Get Current users profile
// @access  Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        .populate('user',['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
} );

// @route   POST api/profile/ 
// @desc    Create/update user profile
// @access  Private
router.post('/',[ auth, 
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
        ]
     ],
       async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile objects 
    }
);


module.exports = router;