export type Ingredient = {
  name: string,
  quantity: string
}

export type Recipe = {
  name: string,
  preparationTimeInMinutes: number,
  description: string,
  ingredients: Ingredient[]

}