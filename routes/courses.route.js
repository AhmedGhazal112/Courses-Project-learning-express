const router = require('express').Router();
const { getCourses, getCourse, addCourse } = require("../controllers/courses.controller");
const authorize = require('../middlewares/authorize');
const { courseValidation } = require("../middlewares/validationSchema");

router.route('/').
    get(getCourses).
    post(courseValidation, addCourse);

router.route('/:id').get(authorize(["admin", "manager"]), getCourse);
module.exports = router;