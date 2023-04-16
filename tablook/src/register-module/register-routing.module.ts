import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';

const routes: Routes = [{ path: '', component: RegisterCustomerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RegisterRoutingModule {}
