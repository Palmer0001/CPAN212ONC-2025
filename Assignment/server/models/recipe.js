import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  ingredients: {
    type: [String],
    default: []
  },
  steps: {
    type: [String],
    default: []
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;