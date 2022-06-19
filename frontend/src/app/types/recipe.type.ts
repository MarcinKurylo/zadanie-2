import { Ingredient } from "./ingredient.type"

export type Recipe = {
  _id?: string,
  name: string,
  description: string,
  preparationTimeInMinutes: number,
  ingredients: Ingredient[]
}