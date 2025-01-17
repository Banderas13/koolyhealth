import { CanActivateFn, Router} from  '@angular/router';
import { inject } from '@angular/core';

// the auth guard needs to return a true boolean if the route can be activated
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if we have a token in localStorage
  const token = localStorage.getItem('token');
  
  if (token) { //<----- put the token back when done with the CSS
	// in real app, would make request to server to check if token is valid ;)
	// for example: (authService.validateToken(token))
    return true;
  }
  
  // Store the attempted URL for redirecting
  localStorage.setItem('redirectUrl', state.url);
  
  // If no token, redirect to login page
  return router.navigate(['/login']);
};