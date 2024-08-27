import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post } from '../../entities/Post';

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
  isLoading: boolean = true;
  loadError: boolean = false;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    this.isLoading = true;
    this.loadError = false;
    const urlSlug = this.route.snapshot.paramMap.get('urlSlug') || '';
    this.postService.fetchPostBySlug(urlSlug).subscribe({
      next: (data: Post) => {
        this.post = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener el post', error);
        this.loadError = true;
        this.isLoading = false;
      },
    });
  }
}
