import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../interfaces/User';


@Component({
  selector: 'app-registration',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule,ReactiveFormsModule,MatIconModule,RouterLink,MatProgressSpinner],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rePassword: new FormControl('', [Validators.required]),
    phonenumber:new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
 
    })
     });
  
  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(private router: Router,private authService:AuthService) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Hibás adat, próbáld újra.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: Partial<User> = {
      name: {
        firstname: this.signUpForm.value.name?.firstname || '',
        lastname: this.signUpForm.value.name?.lastname || ''
      },
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      phonenumber:this.signUpForm.value.phonenumber ||''
    };

    console.log('Felhasználó érkezik:', newUser);
    console.log('Form value:', this.signUpForm.value);

    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);


const email = this.signUpForm.value.email || '';
const pw = this.signUpForm.value.password || '';

    this.authService.signUp(email, pw, newUser)
      .then(userCredential => {
        console.log('Registration succesful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        this.signupError ='Regisztrációs hiba:', error;
        this.isLoading = false;
        this.showForm = true;
      
      });

  }
}