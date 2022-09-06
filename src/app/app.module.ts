import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SimpleCalculatorComponent } from './components/simple-calculator/simple-calculator.component';
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
import {
  provideFirestore,
  getFirestore,
  FirestoreModule,
} from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { GeneralServicesService } from './services/general-services.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, SimpleCalculatorComponent],
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
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFirestore(() => getFirestore()),
  ],
  providers: [GeneralServicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
