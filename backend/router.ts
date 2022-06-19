import { Router, Request, Response  } from "express"
import { RecipeModel } from './schemas';
import { Recipe } from "./types";

export const router = Router()

router.route('/recipe')
.get((req: Request, res: Response) => {
  let filter = {}
  if (req.query.name) {
    filter =  {name: { "$regex": req.query.name, "$options": "i" }}
  }
  RecipeModel.find(filter)
  .then((recipe) => res.status(200).json({code: 200, action: 'GET',items: recipe}))
})
.post( (req: Request, res: Response): void => {
  const recipe = new RecipeModel(req.body)
  RecipeModel.create(recipe)
  .then(recipe => res.status(200).json({ code: 200, action: 'POST', items: recipe}))
  .catch((e: Error) => res.json(e))
})
router.route('/recipe/:id')
.get((req: Request, res: Response) => {
  RecipeModel.findById(req.params.id)
  .then(recipe => res.status(200).json({code: 200, action: 'GET', items: recipe}))
})
.delete((req: Request, res: Response) => {
  RecipeModel.findByIdAndDelete(req.params.id)
  .then(recipe => res.status(200).json({ code: 200, action: 'DELETE', items: recipe}))
  .catch((e: Error) => res.json(e))
})
.put((req: Request, res: Response) => {
  RecipeModel.findByIdAndUpdate(req.params.id, req.body)
  .then(recipe=> res.status(200).json({ code: 200, action: 'PUT', items: recipe}))
  .catch((e: Error) => res.json(e))
})