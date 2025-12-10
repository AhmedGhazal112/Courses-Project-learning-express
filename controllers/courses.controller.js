const Course = require("../models/course.model"), { validationResult } = require('express-validator');
const asyncWrapper = require('../middlewares/asyncWrapper');

const getCourses = asyncWrapper(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 2;
    const page = parseInt(req.query.page) || 1;
    if (limit <= 0 || page <= 0) {
        return res.status(400).json({ error: "Limit and page must be positive integers" });
    }

    const skip = (page - 1) * limit;
    const courses = await Course.find().skip(skip).limit(limit);
    res.status(200).json(courses);
});

const getCourse = asyncWrapper(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
});

const addCourse = asyncWrapper(async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
});

module.exports = { getCourses, getCourse, addCourse };