import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../entities/Post';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private mapPost(dbPost: any): Post {
    return {
      id: dbPost.id,
      title: dbPost.title,
      urlSlug: dbPost.url_slug,
      content: dbPost.content,
      contentResume: dbPost.content_resume,
      isPublished: dbPost.is_published,
      createdAt: new Date(dbPost.created_at),
      updatedAt: new Date(dbPost.updated_at),
      author: dbPost.author,
      postTags: dbPost.post_tags,
    };
  }

  // Obtiene la lista completa de posts
  getPosts(limit = 10, offset = 0): Observable<Post[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(map((dbPosts) => dbPosts.map(this.mapPost)));
  }

  // Obtiene posts aleatoriamente
  getRandomPosts(): Observable<Post[]> {
    return this.http.get<any[]>(`${this.apiUrl}/random?n=3`).pipe(map((dbPosts) => dbPosts.map(this.mapPost)));
  }

  // Obtiene un post específico por slug
  fetchPostBySlug(urlSlug: string): Observable<Post> {
    return this.http.get<any>(`${this.apiUrl}/${urlSlug}`).pipe(map(this.mapPost));
  }

  // Busca posts por título
  searchPosts(query: string): Observable<Post[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/search?query=${query}`)
      .pipe(map((dbPosts) => dbPosts.map(this.mapPost)));
  }
}
