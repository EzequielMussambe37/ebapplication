import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleCalculatorComponent } from './components/simple-calculator/simple-calculator.component';
import { LoginComponent } from './components/login/login.component';
import { ResultPlotlyComponent } from './components/result-plotly/result-plotly.component';
import { UserGuardService } from './guards/user-guard.service';
//  { path: 'budget/:username', component: SimpleCalculatorComponent },
const appRoutes: Routes = [
  {
    path: 'budget',
    component: SimpleCalculatorComponent,
    canActivate: [UserGuardService],
  },
  { path: 'login', component: LoginComponent },
  //{ path: '**', component: NotFoundComponent },
  { path: 'result', component: ResultPlotlyComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
