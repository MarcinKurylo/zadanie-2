import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe.type';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {

  public recipe!: Recipe;
  public eventsSubscription!: Subscription

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private eventsService: EventsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.getRecipe(id)
    })

    this.eventsSubscription = this.eventsService.event.subscribe(event =>{
      if (event.action === 'PUT') {
        this.getRecipe(this.recipe._id!)
      }
    })
  }

  public deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe._id as string).subscribe((event) => {
      this.eventsService.emit({action: event.action, code: event.code})
      this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {txt: 'Recipe deleted successfully', header: 'Recipe deleted'}
      });
      this.router.navigate(['/'])
    })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {txt: 'Do you really want to delete this recipe?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      this.deleteRecipe()
    });
  }

  private getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe(recipe => this.recipe = recipe.items)
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe()
  }

}
