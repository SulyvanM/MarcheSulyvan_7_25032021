const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');
const { body, validationResult } = require('express-validator');

//validation schema exress-validator
const schemaValidator = [
    body('comment', 'Comment length not valid')
        .not()
        .isEmpty()
        .isString()
        .isLength({ max:255 })
];

//checks if the validation has retained errors
const checkError =  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    next();
};

router.post('/:id', auth, schemaValidator, checkError, commentCtrl.addComment);
router.put('/:id', auth, schemaValidator, checkError, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;