const Recipe = require("../models/recipeModel");

// GET /api/recipes?search=&page=1&limit=10
const getRecipes = (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  const { data, total } = Recipe.getAll({
    search,
    page: Number(page),
    limit: Number(limit)
  });
  res.json({ total, page: Number(page), limit: Number(limit), data });
};

const getRecipeById = (req, res) => {
  const recipe = Recipe.getById(req.params.id);
  if (!recipe) return res.status(404).json({ status: "fail", message: "Recipe not found" });
  res.json(recipe);
};

const createRecipe = (req, res) => {
  const { title, ingredients, steps, servings, tags } = req.body;
  const newRecipe = Recipe.create({ title, ingredients, steps, servings, tags });
  res.status(201).json(newRecipe);
};

const updateRecipe = (req, res) => {
  const updated = Recipe.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ status: "fail", message: "Recipe not found" });
  res.json(updated);
};

const deleteRecipe = (req, res) => {
  const deleted = Recipe.delete(req.params.id);
  if (!deleted) return res.status(404).json({ status: "fail", message: "Recipe not found" });
  res.json({ status: "success", message: "Recipe deleted", data: deleted });
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
