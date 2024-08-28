import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../entities/Post';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  posts: Post[] = [];
  currentYear: number = new Date().getFullYear();
  socialLinks: SocialLink[] = [
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

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.getRandomPosts();
  }

  getRandomPosts() {
    this.postService.getRandomPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('Error al obtener los posts', error);
      },
    });
  }

  navigateToPost(postSlug: string) {
    this.router.navigate(['/post', postSlug]);
  }
}
