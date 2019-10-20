import { AuctionStatsComponent } from './auction-stats/auction-stats.component';
import { MyauctionListComponent } from './profile/myauction-list/myauction-list.component';
import { ProfileComponent } from './profile/profile.component';
import { PostAuctionComponent } from './post-auction/post-auction.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'actions/upload', component: PostAuctionComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile/show-list', component: MyauctionListComponent, canActivate: [AuthGuard] },
  { path: 'product/product-detail', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'profile/show-stats', component: AuctionStatsComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
