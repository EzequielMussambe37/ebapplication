import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleCalculatorComponent } from './components/simple-calculator/simple-calculator.component';
import { LoginComponent } from './components/login/login.component';
import { ResultPlotlyComponent } from './components/result-plotly/result-plotly.component';
import { UserGuardService } from './guards/user-guard.service';
import { MainPageComponent } from './components/main-page/main-page.component';
//import { OptionsPageComponent } from './components/options-page/options-page.component';
import { ResultReportComponent } from './components/result-report/result-report.component';
// import { ResultReportComponent } from './components/result-report/result-report.component';
//  { path: 'budget/:username', component: SimpleCalculatorComponent },
const appRoutes: Routes = [
  {
    path: 'budget',
    component: MainPageComponent,
    children: [
      {
        path: 'report',
        component: ResultReportComponent,
        canActivate: [UserGuardService],
      },
    ],
    canActivate: [UserGuardService],
  },
  { path: 'login', component: LoginComponent },
  //{ path: '**', component: NotFoundComponent },
  {
    path: 'plotly',
    component: ResultPlotlyComponent,
    canActivate: [UserGuardService],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
