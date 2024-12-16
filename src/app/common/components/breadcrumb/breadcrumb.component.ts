import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  $breadcrumbs: { name: string, route: string }[] = [
    {
      name: 'Home',
      route: '/home'
    },
    {
      name: 'Markdown Editor',
      route: '/markdown-editor'
    }
  ]
}
