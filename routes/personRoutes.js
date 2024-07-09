const express = require("express");
const Person = require("./../models/person");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //create a new Person document using the mongoose model
    const newPerson = new Person(data);

    //Save the person to the database
    const savedPerson = await newPerson.save();
    console.log("data saved in database! ! !");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("All data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:workType", async (req, res) => {
  const workType = req.params.workType;
  try {
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType });
      console.log("data with matched work type::");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type!" });
    }
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log("error", err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return updated document
        runValidators: true, //mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person Not found" });
    }
    res.status(200).json(response);

    console.log("data updated ! ! !");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //extract id from the url parameter
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    res.status(200).json({ message: "deleted successfully ! ! ! " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error ! ! !" });
  }
});

module.exports = router;
