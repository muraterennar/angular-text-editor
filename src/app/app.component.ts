import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PouchDbServiceService} from './services/pouch-db-service.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-text-editor';
  likes: number = 0;
  isFlying: boolean = false;

  constructor(private pouchDbService: PouchDbServiceService) {
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(): void {
    this.pouchDbService.getLikes().then(likes => {
      this.likes = likes;  // Mevcut sayıyı component'te göster
    }).catch(err => {
      console.error('Error loading likes:', err);
    });
  }

  incrementLikes(): void {
    this.pouchDbService.incrementLikes().then(() => {
      // Tıklandığında likes sayısını artır ve yeniden yükle
      this.isFlying = true; // Animasyonu başlat

      // Animasyon bittikten sonra, durumu sıfırla
      setTimeout(() => {
        this.isFlying = false;
      }, 1000); // Animasyon süresi kadar bekle (1 saniye)

      this.loadLikes();
    }).catch(err => {
      console.error('Error incrementing likes:', err);
    });
  }

  resetLikes(): void {
    this.pouchDbService.resetLikes().then(() => {
      // Sıfırlama işlemi tamamlandıktan sonra sayıyı 0 olarak güncelle
      this.likes = 0;
    }).catch(err => {
      console.error('Error resetting likes:', err);
    });
  }
}
