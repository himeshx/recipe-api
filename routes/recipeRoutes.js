const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipeController");
const validateRecipe = require("../middlewares/validateRecipe");

// CRUD routes
router.get("/", getRecipes);             // list + search + pagination
router.get("/:id", getRecipeById);      // get single
router.post("/", validateRecipe, createRecipe);  // create
router.put("/:id", validateRecipe, updateRecipe); // update
router.delete("/:id", deleteRecipe);    // delete

module.exports = router;
