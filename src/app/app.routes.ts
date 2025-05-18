import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'notesite',
        loadComponent: () => import('./pages/notesite/notesite.component').then(m => m.NotesiteComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },

    {
        path: 'registration',
        loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent),
        canActivate: [publicGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
    },
];
