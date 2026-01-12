const router = require('express').Router();
const { userValidation } = require('../middlewares/validationSchema');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { getUsers, registerUser, loginUser } = require('../controllers/user.controller');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, asyncWrapper(getUsers));
router.post('/register', userValidation, asyncWrapper(registerUser))
router.post('/login', asyncWrapper(loginUser))

module.exports = router;