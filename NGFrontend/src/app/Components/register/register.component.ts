import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { registerDetails } from '../../Interfaces/User';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  errorMsg!: string;
  successMsg!: string;

  visible = false;
  visible2 = false;

  constructor(private authService: AuthService, private router: Router) {}
  register(details: registerDetails) {
    this.authService.registerUser(details).subscribe((res) => {
      console.log(res);

      if (res.error) {
        this.visible = true;
        this.errorMsg = res.error;

        setTimeout(() => {
          this.visible = false;
        }, 3000);
      } else if (res.message) {
        this.visible2 = true;
        this.successMsg = res.message;
        this.router.navigate(['login']);
        setTimeout(() => {
          this.visible2 = false;
        }, 3000);
      }
    });
  }
}
