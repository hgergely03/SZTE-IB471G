import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [],
  templateUrl: './username.component.html',
  styleUrl: './username.component.scss'
})
export class UsernameComponent {
  @Input() username!: string;
}
