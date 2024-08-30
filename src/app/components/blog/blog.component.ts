import { Component, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostService } from '../../services/post.service';
import { Post } from '../../entities/Post';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

registerLocaleData(localeEs, 'es-ES', localeEsExtra);

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = true;
  loadError: boolean = false;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    this.loadError = false;
    this.postService.getPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los posts', error);
        this.loadError = true;
        this.isLoading = false;
      },
    });
  }
}
