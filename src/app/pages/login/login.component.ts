import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    login = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    register = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(5)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    
    constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

    getErrorMessage(field: FormControl): string | null {
        const errors = field.errors;
        if (errors?.['required']) {
            return 'Field is required!';
        }

        if (errors?.['email']) {
            return 'Email is invalid!';
        }

        if (errors?.['minlength']) {
            return `Field must be at least ${errors['minlength'].requiredLength} characters!`;
        }

        return null;
    }

    loginSubmit() {
        if (this.login.value.email && this.login.value.password) {
            this.authService.login(this.login.value.email, this.login.value.password).then(() => {
                this.snackBar.open('Login succesful!', 'OK');
                this.router.navigateByUrl('');
            }).catch(() => {
                this.snackBar.open('Email or password incorrect!', 'OK');
            });
        }
    }

    registerSubmit() {
        this.authService.register(this.register.value.email as string, this.register.value.password as string).then(() => {
            this.snackBar.open('Registration succesful!', 'OK');
            this.register.reset();
        }).catch((err) => {
            this.snackBar.open('Error: registration failed!', 'OK');
        });
    }
}
