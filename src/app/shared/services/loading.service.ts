import { Injectable } from '@angular/core';
import { last, Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  //Promise
  loadingWithPromise(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 2) {
          clearInterval(interval);
          if (email === 'apacs' && password === 'testpw') {
            resolve(true);
          } else {
            reject(false);
          }
        }
      }, 1000);
    });
  }
 
}