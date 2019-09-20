import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';
import { MenuPage } from './pages/menu/menu.page';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'resetpassword', loadChildren: () => import('./pages/resetpassword/resetpassword.module').then(m => m.ResetpasswordPageModule) },
  {
    path: '',
    component: MenuPage,
    canActivate: [AuthGuard],
    children: [
      { path: '', canActivate: [AuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
      { path: 'contatos/:id', loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsPageModule) },
    ]
  },
  { path: 'resetpassword', loadChildren: './pages/resetpassword/resetpassword.module#ResetpasswordPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
