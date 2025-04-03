import express from "express";
import mongoose from "mongoose";
import Recipe from "../models/recipe.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, description, difficulty, ingredients, steps } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Recipe name is required." });
    }

    name = name.trim();
    ingredients = Array.isArray(ingredients) ? ingredients : [];
    steps = Array.isArray(steps) ? steps : [];

    const validDifficulties = ["Easy", "Medium", "Hard"];
    if (difficulty && !validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty level. Choose from: Easy, Medium, Hard." });
    }

    const newRecipe = new Recipe({ name, description, difficulty, ingredients, steps });
    const savedRecipe = await newRecipe.save();

    res.status(201).json({ message: "Recipe added successfully", recipe: savedRecipe });
  } catch (error) {
    res.status(400).json({ message: "Error saving recipe", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe ID format" });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipe", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { name, description, difficulty, ingredients, steps } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe ID format" });
    }

    if (name) {
      name = name.trim();
    }

    ingredients = Array.isArray(ingredients) ? ingredients : [];
    steps = Array.isArray(steps) ? steps : [];

    const validDifficulties = ["Easy", "Medium", "Hard"];
    if (difficulty && !validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty level. Choose from: Easy, Medium, Hard." });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { name, description, difficulty, ingredients, steps },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe ID format" });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error: error.message });
  }
});

export default router;
