import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './modules/components/tabs/tabs.component';
import { AuthComponent } from './modules/features/auth/auth.component';
import { BlogdetailsComponent } from './modules/features/blogdetails/blogdetails.component';
import { CommentsComponent } from './modules/features/comments/comments.component';
import { ContentpageComponent } from './modules/features/contentpage/contentpage.component';


const routes: Routes = [
  {path:'',redirectTo:'account',pathMatch:'full'},
  {path:'account',component:ContentpageComponent},
  {path:'blog',component:BlogdetailsComponent},
  {
    path:'comments',component:CommentsComponent
  },
  {path:'auth',component:AuthComponent},
  {path:'tabs',component:TabsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
