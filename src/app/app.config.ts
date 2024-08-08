import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'glyph-quest',
        appId: '1:942283332592:web:b11e031d82da00441f5b35',
        storageBucket: 'glyph-quest.appspot.com',
        apiKey: 'AIzaSyBBR5-BHGFZoEJegLVkLmvJLiC1v7x5AJ4',
        authDomain: 'glyph-quest.firebaseapp.com',
        messagingSenderId: '942283332592',
        measurementId: 'G-35E31CKD94',
      })
    ),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
  ],
};
