import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  username: string = 'username...';
  email: string = 'test@test.com';
  password: string = 'testtest';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registration() {
    this.authService.registration(this.username, this.email, this.password).subscribe(user => this.router.navigateByUrl('/login'));
  }

}
