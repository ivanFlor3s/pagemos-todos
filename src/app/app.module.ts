import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { GilesTableComponent } from './components/giles-table/giles-table.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarGilComponent } from './components/agregar-gil/agregar-gil.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GastosComponent } from './components/gastos/gastos.component';
import { NgxMaskModule } from 'ngx-mask';
import { PagaGilAppComponent } from './components/paga-gil-app/paga-gil-app.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GilesTableComponent,
    HomeComponent,
    AboutUsComponent,
    AgregarGilComponent,
    GastosComponent,
    PagaGilAppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
