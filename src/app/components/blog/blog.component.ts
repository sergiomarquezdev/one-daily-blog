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

import {Title, Meta} from '@angular/platform-browser';

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

  constructor(private postService: PostService,
              private titleService: Title,
              private metaService: Meta) {
  }

  ngOnInit(): void {
    this.loadInfo();
    this.loadPosts();
    this.getTotalPosts();
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.loadMorePostsOnScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.loadMorePostsOnScroll.bind(this));
  }

  protected loadInfo(): void {
    this.titleService.setTitle('One dAIly Blog - Insights Diarios sobre Tecnología y Programación');
    this.metaService.updateTag({ name: 'description', content: 'One dAIly Blog - Un post diario generado por inteligencia artificial con insights y novedades del mundo de la tecnología y la programación.' });
    this.metaService.updateTag({ property: 'og:title', content: 'One dAIly Blog - Insights Diarios sobre Tecnología y Programación' });
    this.metaService.updateTag({ property: 'og:description', content: 'Un post diario generado por inteligencia artificial con insights y novedades del mundo de la tecnología y la programación.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://blog.sergiomarquez.dev' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'One dAIly Blog - Insights Diarios sobre Tecnología y Programación' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Un post diario generado por inteligencia artificial con insights y novedades del mundo de la tecnología y la programación.' });
    this.metaService.updateTag({ property: 'article:published_time', content: '' });
    this.metaService.updateTag({ property: 'article:author', content: '' });
    this.metaService.updateTag({ rel: 'canonical', href: 'https://blog.sergiomarquez.dev/' });
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

    if ((scrollPosition >= documentHeight - 50) && !this.allPostsLoaded && !this.isLoadingMorePosts) {
      this.isLoadingMorePosts = true;
      this.loadError = false;
      setTimeout(() => {
        this.loadMorePosts();
      }, 2000)
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
