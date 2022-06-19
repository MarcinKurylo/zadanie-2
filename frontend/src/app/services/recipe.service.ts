import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppEvent } from '../types/event.type';
import { Recipe } from '../types/recipe.type';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  constructor(private http: HttpClient) { }

  public getRecipes(filter?: any) {
    return this.http.get<{items: Recipe[]} & AppEvent>('/api/recipe', {params: {...filter}})
  }

  public getRecipe(id: string) {
    return this.http.get<{items: Recipe }& AppEvent>(`/api/recipe/${id}`)
  }

  public createRecipe(recipe: any) {
    return this.http.post<{items: Recipe }& AppEvent>(`/api/recipe`, recipe)
  }

  public updateRecipe(id: string, recipe: any) {
    return this.http.put<{items: Recipe }& AppEvent>(`/api/recipe/${id}`, recipe)
  }

  public deleteRecipe(id: string) {
    return this.http.delete<{items: Recipe} & AppEvent>(`/api/recipe/${id}`)
  }
}
