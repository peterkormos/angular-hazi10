import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(user => this.router.navigateByUrl('/ideas'));
  }
}
