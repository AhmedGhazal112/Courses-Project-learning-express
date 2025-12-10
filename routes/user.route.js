const router = require('express').Router();
const { userValidation } = require('../middlewares/validationSchema');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { getUsers, registerUser, loginUser } = require('../controllers/user.controller');
const verify = require('../middlewares/verify');

router.get('/', verify, asyncWrapper(getUsers));
router.post('/register', userValidation, asyncWrapper(registerUser))
router.post('/login', asyncWrapper(loginUser))

module.exports = router;