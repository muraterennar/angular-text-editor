import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EDITOR_LOGO} from '../../common/constants/static-images';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  protected readonly EDITOR_LOGO = EDITOR_LOGO;

  constructor(private router: Router) {
  }

  goToMarkdownEditor() {
    this.router.navigate(['/markdown-editor']).then(r => console.log('Navigated to markdown editor'));
  }



}
