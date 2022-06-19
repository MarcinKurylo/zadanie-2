import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounce, Subscription } from 'rxjs';
import { EventsService } from '../services/events.service';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../types/recipe.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public recipesList: Recipe[] = []
  public searchInput: string = ''
  private debounce: any
  private eventsSubscription!: Subscription

  constructor(private recipeService: RecipeService, private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.eventsService.event.subscribe(event =>{
      if (event.action === 'DELETE' || event.action === 'POST' || event.action === 'PUT') {
        this.getRecipes()
      }
    })
    this.getRecipes()
  }

  public onSearchChange() {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this.getRecipes({name: this.searchInput})
    }, 500);
  }

  private getRecipes(filter?: any): void {
    this.recipeService.getRecipes(filter).subscribe(recipes => {
      this.recipesList = recipes.items
    })
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe()
  }

}
