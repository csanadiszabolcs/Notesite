import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../shared/services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-login',
  imports: [RouterLink,MatFormFieldModule,MatProgressSpinnerModule, MatInputModule, MatButtonModule, FormsModule,ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnDestroy {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  authSubscription?: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  login() {
    if (this.email.invalid) {
      this.loginError = 'Helyes email címmel lépjen be!';
      return;
    }
    
    if (this.password.invalid) {
      this.loginError = 'Legalább 4 karakterből álló jelszót adjon meg';
      return;
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    
    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';

    this.authService.signIn(emailValue, passwordValue)
      .then(userCredential => {
        console.log('Sikeres bejelentkezés', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Hibás bejelentkezés!:', error);
        this.isLoading = false;
        this.showLoginForm = true;
        
        switch(error.code) {
          case 'auth/user-not-found':
            this.loginError = 'Nem található fiók ilyen email címmel!';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Hibás jelszó!';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Hibás email vagy jelszó';
            break;
          default:
            this.loginError = 'Authentication failed. Please try again later.';
        }
      });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}


/*
export class LoginComponent {

  
  constructor(private loadingService:LoadingService, private router:Router){
  }
  firstname = new FormControl('');
  lastname = new FormControl('');
  password = new FormControl('');
  email = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  loadingSubscription?: Subscription;
 // PROMISE login
  
 login() {
  const firstname = this.firstname.value || '';
  const lastname = this.lastname.value || '';
  const passwordValue = this.password.value || '';
  const email =this.email.value|| '';
  this.loginError = '';

  if (this.email.value === 'vakkancs'  &&this.password.value === 'testpw') {
    this.isLoading = true;
    this.showLoginForm = false;

    localStorage.setItem('isLoggedIn', 'true');

    this.loadingService.loadingWithPromise(email, passwordValue).then((data: boolean) => {
        this.router.navigateByUrl('/home');
    }).catch(error => {
      console.error(error);
      this.isLoading = false;
      this.showLoginForm = true;
      this.loginError = 'Betöltési hiba!';
    }).finally(() => {
      console.log("A függvény lefutott!!")
    });
  } else {
    this.loginError = 'Hibás felhasználónév vagy jelszó!';
  }
}
/*
login2() {
  const firstname = this.firstname.value || '';
  const lastname = this.lastname.value || '';
  const passwordValue = this.password.value || '';

  this.isLoading = true;
  this.showLoginForm = false;
  this.loginError = '';


  this.loadingService.loadingWithPromise2(firstname,lastname, passwordValue).then((_: boolean) => {
    console.log("This executed second!");
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigateByUrl('/home');
  }).catch(error => {
    this.isLoading = false;
    this.showLoginForm = true;
    this.loginError = 'Invalid email or password!';
    console.error(error);
  }).finally(() => {
    console.log("This executed finally!");
  });

  console.log("This executed first!");
}

// async-await
async login3() {
  const emailValue = this.email.value || '';
  const passwordValue = this.password.value || '';
  try {
    // then
    const bool = await this.loadingService.loadingWithPromise3(emailValue, passwordValue);
    console.log(bool, "This executed second!");
    this.isLoading = true;
    this.showLoginForm = false;
    this.router.navigateByUrl('/home');
    localStorage.setItem('isLoggedIn', 'true');
    // catch
  } catch (error) {
    console.error(error)
  }
  // finally
  console.log("This executed finally!");
}
*/
// OBSERVABLE login
/*
login() {
  const firstname = this.firstname.value || '';
  const lastname = this.lastname.value || '';
  const passwordValue = this.password.value || '';
  // memory leak
  this.loadingSubscription = this.loadingService.loadingWithPromise(firstname,lastname, passwordValue).subscribe((data: boolean)=>{
    console.log(data);
  });
}

ngOnDestroy() {
  this.loadingSubscription?.unsubscribe;
}
}*/
