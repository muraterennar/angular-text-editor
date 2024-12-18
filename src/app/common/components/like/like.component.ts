import {Component, OnInit} from '@angular/core';
import {PouchDbServiceService} from '../../../services/pouch-db-service.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LikeService} from '../../../services/like.service';

@Component({
  selector: 'app-like',
  imports: [CommonModule, FormsModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css'
})
export class LikeComponent implements OnInit {
  likes: number;
  isFlying: boolean = false;

  constructor(private likeService: LikeService) {
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(): void {
    this.likeService.getLikes().subscribe((response) => {
      console.log('Likes:', response);
      this.likes = response?.likes;
    }, (error) => {
      console.error('Error loading likes:', error);
    });
  }

  incrementLikes(): void {
    this.likeService.likePost().subscribe((response) => {
      console.log('Likes:', response);
      this.likes = response?.likes;

      // Animasyon bittikten sonra, durumu sıfırla
      setTimeout(() => {
        this.isFlying = false;
      }, 1000); // Animasyon süresi kadar bekle (1 saniye)
    }, (error) => {
      console.error('Error incrementing likes:', error);
    });
  }

  resetLikes(): void {
    this.likeService.resetLikes().subscribe((response) => {
      console.log('Likes:', response);
      this.likes = response?.likes;
    }, (error) => {
      console.error('Error resetting likes:', error);
    });
  }
}
