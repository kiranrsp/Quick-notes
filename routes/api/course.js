const express = require("express");
const router = express.Router();
const courseCtrl = require("../../controllers/api/course");
// require the authorization middleware function
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, courseCtrl.getAllCourses);
router.get("/:id", ensureLoggedIn, courseCtrl.getCourse);
router.post("/", ensureLoggedIn, courseCtrl.createCourse);
router.put("/:id", ensureLoggedIn, courseCtrl.updateCourse);
router.delete("/:id", ensureLoggedIn, courseCtrl.deleteCourse);


module.exports = router;
