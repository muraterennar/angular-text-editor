import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LikeComponent} from './common/components/like/like.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, LikeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-text-editor';
}
