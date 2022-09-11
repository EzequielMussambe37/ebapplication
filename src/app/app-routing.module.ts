import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleCalculatorComponent } from './components/simple-calculator/simple-calculator.component';
import { LoginComponent } from './components/login/login.component';
//  { path: 'budget/:username', component: SimpleCalculatorComponent },
const appRoutes: Routes = [
  { path: 'budget', component: SimpleCalculatorComponent },
  { path: 'login', component: LoginComponent },
  // { path: '**', component: NotFoundComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
