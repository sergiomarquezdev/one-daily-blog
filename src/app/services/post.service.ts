import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Post} from '../entities/Post';
import {DbPost} from "../entities/DbPost";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {
  }

  private mapPost(dbPost: DbPost): Post {
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

  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error en la solicitud:', error);
    return throwError(() => new Error('Ocurrió un error en la solicitud. Inténtalo de nuevo más tarde.'));
  }

  // Obtiene la lista completa de posts
  getPosts(limit: number = 10, offset: number = 0): Observable<Post[]> {
    return this.http
      .get<DbPost[]>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        map((dbPosts) => dbPosts.map(this.mapPost)),
        catchError(this.handleError)
      );
  }

  // Obtiene posts aleatoriamente
  getRandomPosts(): Observable<Post[]> {
    return this.http
      .get<DbPost[]>(`${this.apiUrl}/random?n=3`)
      .pipe(
        map((dbPosts) => dbPosts.map(this.mapPost)),
        catchError(this.handleError)
      );
  }

  // Obtiene un post específico por slug
  fetchPostBySlug(urlSlug: string): Observable<Post> {
    return this.http
      .get<DbPost>(`${this.apiUrl}/slug?urlSlug=${urlSlug}`)
      .pipe(
        map(this.mapPost),
        catchError(this.handleError)
      );
  }

  // Obtener el post anterior
  fetchPreviousPost(postId: number): Observable<Post> {
    return this.http
      .get<DbPost>(`${this.apiUrl}/previous?postId=${postId}`)
      .pipe(
        map(this.mapPost),
        catchError(this.handleError)
      );
  }

  // Obtener el post siguiente
  fetchNextPost(postId: number): Observable<Post> {
    return this.http
      .get<DbPost>(`${this.apiUrl}/next?postId=${postId}`)
      .pipe(
        map(this.mapPost),
        catchError(this.handleError)
      );
  }
}
