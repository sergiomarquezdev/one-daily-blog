import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Post} from '../../entities/Post';
import {SocialLink} from "../../entities/SocialLink";


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  posts: Post[] = [];
  currentYear = new Date().getFullYear();
  socialLinks: SocialLink[] = [
    {
      name: 'Portfolio Web',
      url: 'https://sergiomarquez.dev',
      icon: 'fa-solid fa-globe',
      ariaLabel: 'Portfolio web de Sergio Márquez',
    },
    {
      name: 'Email',
      url: 'mailto:sergiomarquezdev@gmail.com',
      icon: 'fa-regular fa-envelope',
      ariaLabel: 'Enviar correo a Sergio',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/sergiomarquezdev',
      icon: 'fa-brands fa-github',
      ariaLabel: 'Perfil de GitHub de Sergio',
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/smarquezp05',
      icon: 'fa-brands fa-x-twitter',
      ariaLabel: 'Perfil de X de Sergio',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sergio-marquez-perez/',
      icon: 'fa-brands fa-linkedin',
      ariaLabel: 'Perfil de LinkedIn de Sergio',
    },
  ];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.loadRandomPosts();
  }

  private loadRandomPosts(): void {
    this.postService.getRandomPosts().subscribe({
      next: (data: Post[]) => this.handlePostsLoad(data),
      error: (error) => this.handleError(error),
    });
  }

  private handlePostsLoad(data: Post[]): void {
    this.posts = data;
  }

  private handleError(error: any): void {
    console.error('Error al obtener los posts', error);
  }
}
