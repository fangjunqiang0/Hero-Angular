import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    LoginComponent,
    HomeComponent,
    HeroDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
