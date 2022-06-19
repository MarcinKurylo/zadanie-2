import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { EventsService } from 'src/app/services/events.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe.type';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  public recipe!: Recipe
  public recipeId: string = ''

  public recipeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
    description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]],
    preparationTimeInMinutes: [0, Validators.required],
    ingredients: this.fb.array([
      this.fb.group(
        {
          name: ['', Validators.required],
          quantity: ['', Validators.required]
        }
      ),
      this.fb.group(
        {
          name: ['', Validators.required],
          quantity: ['', Validators.required]
        }
      )
    ])
  })

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private fb: FormBuilder, private eventsService: EventsService, private router: Router,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(async params => {
      this.recipeId= params['id']
      if (this.recipeId) {
        await this.getRecipe(this.recipeId)
        for (let i = 0; i < this.recipe.ingredients.length - 2; i++) {
          this.addIngredient()
        }
        this.recipeForm.patchValue(this.recipe)
      }
    })
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  public addIngredient() {
    (this.recipeForm.get('ingredients') as FormArray)!.push(this.fb.group(
      {
        name: ['', Validators.required],
        quantity: ['', Validators.required]
      }
    ));
  }

  public onSubmit() {
    const recipe = this.recipeForm.value as unknown as Recipe
    if (this.recipeId) {
      this.updateRecipe(this.recipeId, recipe)
    } else {
      this.createRecipe(recipe)
    }
  }

  public cancel() {
    this.recipeForm.reset()
    this.router.navigate(['/'])
  }

  private async getRecipe(id: string): Promise<void> {
    this.recipe = (await this.recipeService.getRecipe(id).toPromise())!.items
  }

  private createRecipe(recipe: Recipe): void {
    this.recipeService.createRecipe(recipe).subscribe(recipe => {
      this.recipe = recipe.items
      this.eventsService.emit({action: recipe.action, code: recipe.code})
      this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {txt: 'Recipe created successfully', header: 'Recipe created'}
      });
      this.router.navigate(['/recipe', recipe.items._id])
    })
  }

  private updateRecipe(id: string, recipe: Recipe): void {
    this.recipeService.updateRecipe(id, recipe).subscribe(recipe => {
      this.recipe = recipe.items
      this.eventsService.emit({action: recipe.action, code: recipe.code})
      this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {txt: 'Recipe updated successfully', header: 'Recipe updated'}
      });
      this.router.navigate(['/recipe', recipe.items._id])
    })
  }

}
