import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { LoginComponent } from './login/login.component';
import { MealsComponent } from './meals/meals.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'meals', component: MealsComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'search', component: SearchComponent },
    { path: 'user', component: UserComponent },
];
