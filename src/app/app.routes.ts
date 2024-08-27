import {Routes} from '@angular/router';
import {BlogComponent} from './components/blog/blog.component';
import {PostComponent} from './components/post/post.component';

export const routes: Routes = [
  {path: '', component: BlogComponent},
  { path: 'post/:urlSlug', component: PostComponent },
  {path: '**', redirectTo: ''}
];
