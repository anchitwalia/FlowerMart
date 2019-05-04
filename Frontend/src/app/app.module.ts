import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddflowerComponent } from './addflower/addflower.component';
import { BuyComponent } from './buy/buy.component';
import { CusorderComponent } from './cusorder/cusorder.component';
import { ShiporderComponent } from './shiporder/shiporder.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthSellerGuard } from './guard/auth-seller.guard';
import { AuthCustomerGuard } from './guard/auth-customer.guard';

const dashboardRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'shiporder', canActivate: [AuthSellerGuard], component: ShiporderComponent },
  { path: 'orders', canActivate: [AuthSellerGuard], component: OrdersComponent },
  { path: 'addflower', canActivate: [AuthSellerGuard], component: AddflowerComponent },
  { path: 'cusorder', canActivate: [AuthCustomerGuard], component: CusorderComponent },
  { path: 'buy', component: BuyComponent }
];

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: dashboardRoutes },
  { path: '**',  component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PagenotfoundComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AddflowerComponent,
    BuyComponent,
    CusorderComponent,
    ShiporderComponent,
    OrdersComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthSellerGuard, AuthCustomerGuard, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit{

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    
  }
 }
