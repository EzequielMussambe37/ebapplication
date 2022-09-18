import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { GeneralServicesService } from './services/general-services.service';
import { HttpClientModule } from '@angular/common/http';
// import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SimpleCalculatorComponent } from './components/simple-calculator/simple-calculator.component';
import { LoginComponent } from './components/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { ResultPlotlyComponent } from './components/result-plotly/result-plotly.component';
import { UserGuardService } from './guards/user-guard.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SimpleCalculatorComponent,
    LoginComponent,
    DialogBoxComponent,
    ResultPlotlyComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FirestoreModule,
    //AngularFirestore,
    // PlotlyModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFirestore(() => getFirestore()),
  ],
  providers: [GeneralServicesService, UserGuardService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
