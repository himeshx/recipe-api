const { v4: uuidv4 } = require("uuid");

let recipes = [
  {
    id: uuidv4(),
    title: "Masala Omelette",
    ingredients: ["eggs", "onion", "tomato", "salt", "pepper"],
    steps: ["Beat eggs", "Chop onion & tomato", "Cook on pan"],
    servings: 1,
    tags: ["breakfast", "quick"],
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: "Lemon Rice",
    ingredients: ["rice", "lemon", "mustard seeds", "peanuts", "salt"],
    steps: ["Cook rice", "Tempering", "Mix and serve"],
    servings: 2,
    tags: ["lunch", "south-indian"],
    createdAt: new Date().toISOString()
  }
];

class RecipeModel {
  static getAll({ search = "", page = 1, limit = 10 } = {}) {
    let data = recipes;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(r => r.title.toLowerCase().includes(q) || (r.tags || []).some(t => t.toLowerCase().includes(q)));
    }
    const total = data.length;
    const start = (page - 1) * limit;
    data = data.slice(start, start + limit);
    return { data, total };
  }

  static getById(id) {
    return recipes.find(r => r.id === id) || null;
  }

  static create({ title, ingredients = [], steps = [], servings = 1, tags = [] }) {
    const newRecipe = {
      id: uuidv4(),
      title,
      ingredients,
      steps,
      servings,
      tags,
      createdAt: new Date().toISOString()
    };
    recipes.push(newRecipe);
    return newRecipe;
  }

  static update(id, { title, ingredients, steps, servings, tags }) {
    const idx = recipes.findIndex(r => r.id === id);
    if (idx === -1) return null;
    const existing = recipes[idx];
    const updated = {
      ...existing,
      title: title !== undefined ? title : existing.title,
      ingredients: ingredients !== undefined ? ingredients : existing.ingredients,
      steps: steps !== undefined ? steps : existing.steps,
      servings: servings !== undefined ? servings : existing.servings,
      tags: tags !== undefined ? tags : existing.tags,
      updatedAt: new Date().toISOString()
    };
    recipes[idx] = updated;
    return updated;
  }

  static delete(id) {
    const idx = recipes.findIndex(r => r.id === id);
    if (idx === -1) return null;
    return recipes.splice(idx, 1)[0];
  }
}

module.exports = RecipeModel;
