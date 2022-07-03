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
import { NeutrarPipe } from './pipes/neutrar.pipe';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { gilesReducer } from './redux/gastos.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import _ from 'lodash';

export function saveInLocalStorage<S, A extends Action = Action>(reducer: ActionReducer<S, A>){
  return function(state: S, action: A): S {
    const nextState = reducer(state, action);
    const savedState = JSON.parse(localStorage.getItem('__storage__')) || {};
    _.merge(nextState, savedState);
    localStorage.setItem('__storage__', JSON.stringify(nextState))
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[]=[saveInLocalStorage]

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
    FooterComponent,
    NeutrarPipe,
  ],
  imports: [
    BrowserModule,
    UiSwitchModule
    .forRoot({
      size: 'small',
      checkedLabel: 'On',
      uncheckedLabel: 'Off',
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    StoreModule.forRoot({giles: gilesReducer},{metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
