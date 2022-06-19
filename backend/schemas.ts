import { Schema, model } from "mongoose"
import { Ingredient, Recipe } from "./types"

export const IngredientSchema = new Schema<Ingredient>({
  name: {type: String, required: true},
  quantity: {type: String, required: true}
})

export const RecipeSchema = new Schema<Recipe>({
  name: {type: String, required: true, minLength: 3, maxLength: 55},
  preparationTimeInMinutes: {type: Number, required: true},
  description: {type: String, required: true, minLength: 15, maxLength: 255},
  ingredients: {type:[IngredientSchema], required: true, validate: [(ingredients: Ingredient[]) => ingredients.length >= 2, 'Must be an array of min len of 2'] }
})

export const RecipeModel = model<Recipe>('Recipe', RecipeSchema)