import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { RecipeComponent } from './details/recipe/recipe.component';
import { RecipeFormComponent } from './details/recipe/recipe-form/recipe-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { AuthorDialogComponent } from './author-dialog/author-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TimePipe } from './time.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListComponent,
    DetailsComponent,
    RecipeComponent,
    RecipeFormComponent,
    AuthorDialogComponent,
    ConfirmDialogComponent,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
