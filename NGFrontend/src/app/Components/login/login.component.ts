import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../Services/auth.service';
import { loginDetails } from '../../Interfaces/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMsg!: string;
  sucessMsg!: string;
  visible = false;
  visible2 = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autheService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  login(details: loginDetails) {
    console.log('Login details: ' + JSON.stringify(details));

    this.autheService.loginUser(details).subscribe((res) => {
      if (res.error) {
        this.visible = true;
        this.errorMsg = res.error;

        setTimeout(() => {
          this.visible = false;
        }, 3000);
      } else if (res.message) {
        this.visible2 = true;
        this.sucessMsg = res.message;

        localStorage.setItem('token', res.token);

        this.autheService.readToken(res.token).subscribe((res) => {
          setTimeout(() => {
            this.visible2 = false;

            if (res.info && res.info.role) {
              if (res.info.role == 'admin') {
                this.router.navigate(['admin']);
              } else if (res.info.role == 'user') {
                this.router.navigate(['user']);
              }
            } else {
              console.log('Role information not available');
            }
          }, 2000);
        });
      }
    });
  }
}
