import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'https://angular-text-editor-api.onrender.com/api/likes'; // API URL

  constructor(private httpClient: HttpClient) {
  }

  // Like verisini alır
  getLikes(): Observable<{ likes: number }> {
    return this.httpClient.get<{ likes: number }>(this.apiUrl);
  }

  likePost(): Observable<{ likes: number }> {
    return this.httpClient.post<{ likes: number }>(`${this.apiUrl}/inc`, {});
  }

  resetLikes(): Observable<{ likes: number }> {
    return this.httpClient.post<{ likes: number }>(`${this.apiUrl}/reset`, {});
  }
}
