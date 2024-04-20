import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DetailsComponent } from './pages/details/details.component';
import { UploadComponent } from './pages/upload/upload.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'upload', component: UploadComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'details/:id', component: DetailsComponent},
    {path: '**', redirectTo: ''}
];
