import { Component, OnInit } from '@angular/core';
import { UsernameComponent } from "../../components/username/username.component";
import { MatTableModule } from "@angular/material/table";
import { Torrent } from '../../model/torrent';
import { YarrTimePipe } from "../../pipes/yarr-time.pipe";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [
        UsernameComponent,
        MatTableModule,
        YarrTimePipe,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        RouterLink
    ]
})
export class ProfileComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'downloaded', 'upload-date', 'delete'];
    dataSource: Torrent[] = [];
    user?: User;

    update = new FormGroup({
        username: new FormControl('', [Validators.minLength(5)]),
        email: new FormControl('', [Validators.email]),
        password: new FormControl('', [Validators.minLength(6)]),
    });

    constructor(private auth: AuthService, private dbService: DatabaseService, private snackBar: MatSnackBar) {}
    
    async ngOnInit(): Promise<void> {
        this.dbService.getUser(await this.auth.getUserId() as string).subscribe(user => {
            this.user = user;
        });

        this.dbService.getTorrentsByUploaderId(await this.auth.getUserId() as string).subscribe(torrents => {
            this.dataSource = torrents;
        });
    }

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

    async updateUser() {
        const pw = this.update.controls.password;
        if (pw.value !== null) {
            this.auth.changePassword(pw.value).then(() => {
                this.snackBar.open('Password successfully changed!', 'OK');
                this.update.reset();
            });
        }

        const id = await this.auth.getUserId() as string;

        const un = this.update.controls.username.value === null ? this.user?.username as string : this.update.controls.username.value;
        const em = this.update.controls.email.value === null ? this.user?.email as string : this.update.controls.email.value;
        const user: User = {
            id: id,
            username: un,
            email: em
        }

        if (un == this.user?.username && em == this.user?.email) {
            return;
        }

        this.dbService.updateUser(user).then(() => {
            this.snackBar.open('User successfully updated!', 'OK');
        });

        this.update.reset();
    }

    async deleteTorrent(id: string) {
        this.dbService.deleteTorrent(id).then(() => {
            this.snackBar.open('Torrent successfully deleted!', 'OK');
        });
    }
}
