import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() onMenuClick = new EventEmitter<void>();
  @Input() user?: firebase.default.User | null;

  constructor(private auth: AuthService, private snackBar: MatSnackBar) { }

  clickMenu(): void {
    this.onMenuClick.emit();
  }

  logOut() {
    this.auth.logOut().then(() => {
      this.snackBar.open('Logged out!', 'OK');
    });
  }
}
