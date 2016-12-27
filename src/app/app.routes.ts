import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { LoginComponent} from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForumComponent } from './forum/forum.component';
import { CreateComponent } from './forum/create-topic/create.component';
import { AuthGuard } from './common/auth.guard';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/create', component: CreateComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: '**',    component: NoContentComponent }
];
