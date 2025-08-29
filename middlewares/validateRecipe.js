module.exports = (req, res, next) => {
  const { title, ingredients } = req.body;
  if (!title || typeof title !== "string" || title.trim().length < 2) {
    return res.status(400).json({ status: "fail", message: "Title is required (min 2 chars)" });
  }
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ status: "fail", message: "Ingredients must be a non-empty array" });
  }
  next();
};
