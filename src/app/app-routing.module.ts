import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';

//Components
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path:'home', component: HomeComponent  },
  { path:'about-us', component: AboutUsComponent  },
  { path:'*', pathMatch:'full', redirectTo: 'home'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
