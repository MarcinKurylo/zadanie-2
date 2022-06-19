"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = exports.RecipeSchema = exports.IngredientSchema = void 0;
const mongoose_1 = require("mongoose");
exports.IngredientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true }
});
exports.RecipeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 55 },
    preparationTimeInMinutes: { type: Number, required: true },
    description: { type: String, required: true, minLength: 15, maxLength: 255 },
    ingredients: { type: [exports.IngredientSchema], required: true, validate: [(ingredients) => ingredients.length >= 2, 'Must be an array of min len of 2'] }
});
exports.RecipeModel = (0, mongoose_1.model)('Recipe', exports.RecipeSchema);
