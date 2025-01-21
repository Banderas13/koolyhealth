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
import { InsulineDataComponent } from './registration/insuline-data/insuline-data.component';
import { PersonalDataComponent } from './registration/personal-data/personal-data.component';
import { authGuard } from  './auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'ingredients', canActivate: [authGuard], component: IngredientsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'meals', canActivate: [authGuard], component: MealsComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'recipes', canActivate: [authGuard], component: RecipesComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'search', canActivate: [authGuard], component: SearchComponent },
    { path: 'user', canActivate: [authGuard], component: UserComponent },
    { path: 'insulin-data', component: InsulineDataComponent },
    { path: 'personal-data', component: PersonalDataComponent }
];