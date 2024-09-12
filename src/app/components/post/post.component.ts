import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {PostService} from '../../services/post.service';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Post} from '../../entities/Post';
import {Title, Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostComponent implements OnInit {
  post: Post | null = null;
  previousPost: Post | null = null;
  nextPost: Post | null = null;
  isLoading = true;
  loadError = false;
  urlSlug = '';

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private titleService: Title,
              private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.urlSlug = params.get('urlSlug') || '';
      this.loadPost();
    });
  }

  protected loadPost(): void {
    this.isLoading = true;
    this.loadError = false;
    this.postService.fetchPostBySlug(this.urlSlug).subscribe({
      next: (data: Post) => {
        this.handlePostLoad(data);
        this.loadAdjacentPosts(data.id);
      },
      error: (error) => this.handleError(error),
    });
  }

  private loadAdjacentPosts(postId: number): void {
    this.previousPost = null;
    this.nextPost = null;
    this.postService.fetchPreviousPost(postId).subscribe({
      next: (data: Post) => (this.previousPost = data)
    });

    this.postService.fetchNextPost(postId).subscribe({
      next: (data: Post) => (this.nextPost = data)
    });
  }

  private handlePostLoad(data: Post): void {
    this.post = data;
    this.isLoading = false;

    this.titleService.setTitle(`${data.title} | One dAIly Blog`);
    this.metaService.updateTag({ name: 'description', content: data.contentResume || 'Insights Diarios sobre Tecnología y Programación' });
    this.metaService.updateTag({ property: 'og:title', content: `${data.title} | One dAIly Blog` });
    this.metaService.updateTag({ property: 'og:description', content: data.contentResume || 'Insights Diarios sobre Tecnología y Programación' });
    this.metaService.updateTag({ property: 'og:url', content: `https://blog.sergiomarquez.dev/post/${data.urlSlug}` });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    this.metaService.updateTag({ name: 'twitter:title', content: `${data.title} | One dAIly Blog` });
    this.metaService.updateTag({ name: 'twitter:description', content: data.contentResume || 'Insights Diarios sobre Tecnología y Programación' });
    this.metaService.updateTag({ property: 'article:published_time', content: data.createdAt.toISOString() });
    this.metaService.updateTag({ property: 'article:author', content: data.author });
    this.metaService.updateTag({ rel: 'canonical', href: `https://blog.sergiomarquez.dev/post/${data.urlSlug}` });
  }

  private handleError(error: any): void {
    console.error('Error al obtener el post', error);
    this.loadError = true;
    this.isLoading = false;
  }
}
