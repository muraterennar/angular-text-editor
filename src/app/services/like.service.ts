import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  uri: string = 'https://angular-text-editor-api.onrender.com/api/likes';

  constructor(private httpClient: HttpClient) {
  }

  getLikes() {
    return this.httpClient.get(`${this.uri}`);
  }

  likePost() {
    return this.httpClient.post(`${this.uri}/inc`, {});
  }

  resetLikes() {
    return this.httpClient.post(`${this.uri}/reset`, {});
  }
}
