import { Component } from '@angular/core';

@Component({
  selector: 'app-copy-clipboard',
  imports: [],
  templateUrl: './copy-clipboard.component.html',
  styleUrl: './copy-clipboard.component.css'
})
export class CopyClipboardComponent {
  copyToClipboard(): void {
    alert('Copied to clipboard!');
  }
}
