import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './crud-aap-with-material/main-page/main-page.component';
import { HomeComponent } from './todo-app/home/home.component';
import { ImportantComponent } from './todo-app/important/important.component';

const routes: Routes = [
  { path: 'crud-app/main', component: MainPageComponent},
  { path: 'todo-app/home', component: HomeComponent },
  { path: 'important', component:ImportantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
