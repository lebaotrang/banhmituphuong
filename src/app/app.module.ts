import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { environment } from 'src/environments/environment';
import {foodReducer} from './state/food.reducer';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireFunctionsModule, REGION, USE_EMULATOR} from '@angular/fire/functions';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    StoreModule.forRoot({food: foodReducer}),
    NgxStripeModule.forRoot('pk_test_51HdnJtExvImQYZ6luCw1yeX3IiXsAHWyX7mJDkIhjnHGqjI5tqXeSuhnxvFExoCJ3M5XqcosOGFccFKJdS9w0pAQ00bpU4NF9p'),
    HttpClientModule
  ],
  providers: [
    { provide: REGION, useValue: 'us-central1'}
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
