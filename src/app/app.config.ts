import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import { MERMAID_OPTIONS, provideMarkdown} from 'ngx-markdown';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideMarkdown({
      mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
          darkMode: true,
          look: 'handDrawn',
        },
      },
      loader: HttpClient
    })
  ]
};
