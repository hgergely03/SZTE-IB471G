import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from "./components/navbar/navbar.component";

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
        NavbarComponent
    ]
})
export class AppComponent {
  title = 'yarr-ez';
}
