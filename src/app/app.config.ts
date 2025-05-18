import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "note-2f233", appId: "1:226114611038:web:827c1baf3b333fe216d1cf", storageBucket: "note-2f233.firebasestorage.app", apiKey: "AIzaSyAaxh9Qy4HpeEfcfRdEOkJ_aWZohPjedc0", authDomain: "note-2f233.firebaseapp.com", messagingSenderId: "226114611038" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
