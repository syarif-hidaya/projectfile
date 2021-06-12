import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    ForgotComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
