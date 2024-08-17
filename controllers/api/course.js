const Course = require("../../models/course");

// Get All Courses
const getAllCourses = async (req, res) => {
  try {
    const data = await Course.find({ user: req.user._id })
      .populate("user")
      .sort({ createdAt: 1 })
      .exec();

    if (!data) {
      throw new Error("An error occured while fetching Courses.");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching Courses." });
  }
};

// Get Course by ID
const getCourse = async (req, res) => {
  // console.log(req.body);
  try {
    const data = await Course.findOne({ _id: req.params.id, user: req.user._id })
      .populate("user")
      .exec();

    if (!data) {
      throw new Error("An error occured while fetching Courses.");
    }
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching Courses." });
  }
};

// Create A Course
const createCourse = async (req, res) => {
  // console.log(req.body, req.user._id);

  try {
    let data = {
      user: req.user._id,
      name: req.body.name,
      cost: req.body.cost,
      days: req.body.days,
      rating: req.body.rating,


    };

    //save to database
    // await Courses.create(data);

    const savedCourse = await Course.create(data);

    if (!data) {
      throw new Error("An error occured while creating a Course.");
    }

    //res.status(200).json(data);
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating a Course." });
  }
};

// Update A Course
const updateCourse = async (req, res) => {
  // console.log(req.body);
  try {
    // const { text } = req.body;
    // const data = await Courses.findByIdAndUpdate(req.params.id, { text });

    const data = await Course.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    data.name = req.body.name;
    data.cost = req.body.cost;
    data.days = req.body.days;
    data.rating = req.body.rating;

    
    await data.save();

    if (!data) {
      throw new Error("An error occured while updating a Course.");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while updating a Course." });
  }
};

// Delete A Course by ID
const deleteCourse = async (req, res) => {
  try {
    // console.log(req.params);
    const data = await Course.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!data) {
      throw new Error("An error occured while deleting a Course.");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting a Course." });
  }
};

module.exports = { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse };
