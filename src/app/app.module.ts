import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {AppRoutingModule} from "./app-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { SetupComponent } from './setup/setup.component';
import {FormsModule} from "@angular/forms";
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SetupComponent,
    AboutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
