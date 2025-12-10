const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const asyncWrapper = require('../middlewares/asyncWrapper');
const { validationResult } = require('express-validator');

const getUsers = async (req, res, next) => {
    const users = await User.find({}, { __v: false, password: false });
    return res.status(200).json(users);
};

const registerUser = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ ...req.body, password: hashedPassword });

    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "10m" }
    );
    user.token = token;
    await user.save();
    return res.status(201).json(user);
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
        return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "10m" }
    );
    return res.status(200).json({ token });
};

module.exports = {
    getUsers: asyncWrapper(getUsers),
    registerUser: asyncWrapper(registerUser),
    loginUser: asyncWrapper(loginUser),
};