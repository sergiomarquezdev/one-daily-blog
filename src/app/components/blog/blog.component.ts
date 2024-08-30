import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {PostService} from '../../services/post.service';
import {Post} from '../../entities/Post';

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
export class BlogComponent implements OnInit, AfterViewInit, OnDestroy {
  posts: Post[] = [];
  isLoading = true;
  loadError = false;
  isLoadingMorePosts = false;
  allPostsLoaded = false;
  totalPosts = 0;
  limit = 12;
  offset = 0;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.loadPosts();
    this.getTotalPosts();
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.loadMorePostsOnScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.loadMorePostsOnScroll.bind(this));
  }

  protected loadPosts(): void {
    this.isLoading = true;
    this.loadError = false;
    this.postService.getPosts(this.limit, this.offset).subscribe({
      next: (data: Post[]) => this.handlePostsLoad(data),
      error: (error) => this.handleError(error),
    });
  }

  protected loadMorePosts(): void {
    this.isLoadingMorePosts = true;
    this.loadError = false;
    this.offset += this.limit;
    this.limit = 3;
    this.postService.getPosts(this.limit, this.offset).subscribe({
      next: (data: Post[]) => this.handlePostsLoad(data),
      error: (error) => this.handleError(error),
    });
  }

  protected loadMorePostsOnScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.body.offsetHeight;

    if ((scrollPosition >= documentHeight - 100) && !this.allPostsLoaded && !this.isLoadingMorePosts) {
      this.loadMorePosts();
    }
  }

  protected getTotalPosts(): void {
    this.postService.getTotalPosts().subscribe({
      next: (data: any) => {
        this.totalPosts = data.total_posts;
      },
      error: (error) => {
        console.error('Error al obtener el total de posts:', error);
      }
    });
  }

  private handlePostsLoad(data: Post[]): void {
    if (this.offset === 0) {
      this.posts = data;
    } else {
      this.posts = [...this.posts, ...data];
      if (this.posts.length >= this.totalPosts) {
        this.allPostsLoaded = true;
      }
    }
    this.isLoading = false;
    this.isLoadingMorePosts = false;
  }

  private handleError(error: any): void {
    console.error('Error al obtener los posts', error);
    this.loadError = true;
    this.isLoading = false;
    this.isLoadingMorePosts = false;
  }
}
