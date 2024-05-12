import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        RouterLink,
        MatSidenavModule,
        MatSidenavModule, 
        MatFormFieldModule, 
        MatSelectModule, 
        MatButtonModule, 
        MatIconModule, 
        MatToolbarModule,
        NavbarComponent,
    ]
})
export class AppComponent implements OnInit {
  title = 'yarr-ez';
  user?: firebase.default.User | null;
  
  constructor(private auth: AuthService,  private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.auth.isLoggedIn().subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    this.auth.logOut().then(() => {
      this.snackBar.open('Logged out!', 'OK');
    });
  }
}
