const router = require('express').Router();
const { getCourses, getCourse, addCourse } = require("../controllers/courses.controller");
const { courseValidation } = require("../middlewares/validationSchema");

router.route('/').
    get(getCourses).
    post(courseValidation, addCourse);

router.route('/:id').get(getCourse);
module.exports = router;