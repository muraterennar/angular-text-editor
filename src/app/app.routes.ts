import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'markdown-editor',
    loadComponent: () => import('./components/markdown-editor/markdown-editor.component').then(m => m.MarkdownEditorComponent),
    pathMatch: 'prefix',
  }
];
