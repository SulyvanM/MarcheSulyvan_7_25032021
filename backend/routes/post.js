const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const { body, validationResult } = require('express-validator');


//validation schema exress-validator
const schemaValidator = [
    body('title', 'title not valid')
        .not()
        .isEmpty()
        .isString()
        .isLength({ max: 64}),
    body('desc', 'description not valid')
        .not()
        .isEmpty()
        .isString()
        .isLength({ max:255 })
]

//checks if the validation has retained errors
const checkError =  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    next();
}

//checked if an image is to be sent (because is required for a new post)
const checkIfFile = (req, res, next) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({error: "image not found !"});
    }
    next();
}

router.get('/', auth, postCtrl.getPosts);
router.post('/', auth, multer, checkIfFile, schemaValidator, checkError, postCtrl.createPost);
router.put('/:id', auth, multer, schemaValidator, checkError, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;