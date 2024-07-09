const express = require("express");
const Menu = require("./../models/Menu");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new Menu(data);

    const savedMenu = await newMenu.save();

    console.log("new menu saved !!");
    res.status(200).json(savedMenu);
  } catch (err) {}
});

router.get("/", async (req, res) => {
  try {
    const allMenu = await Menu.find();
    console.log("All menus !");
    res.status(200).json(allMenu);
  } catch (err) {
    console.log("Error:::", err);
  }
});

router.get("/:flavour", async (req, res) => {
  const flavour = req.params.flavour;
  const response = await Menu.find({ taste: flavour });
  res.status(200).json(response);
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const menuItem = req.body;
    const response = await Menu.findByIdAndUpdate(menuId, menuItem, {
      new: true, //return updated document
      runValidators: true, //mongoose validation
    });
    if (!response) {
      res.status(404).json({ message: "Not found menu " });
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error! ! !" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId);

    res.status(200).json({ message: "deleted success!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error! ! !" });
  }
});

module.exports = router;
