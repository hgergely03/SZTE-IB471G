import { Component } from '@angular/core';
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

const MOCK_DATA: Torrent[] = [
    {id: 1, name: 'Torrent 1', downloaded: 100, uploadDate: new Date(), uploaderName: 'Uploader 1', description: 'Description 1', comments: [], likes: 0, size: 10, link: 'https://filesampleshub.com/download/document/txt/sample1.txt'},
    {id: 2, name: 'Torrent 2', downloaded: 200, uploadDate: new Date(), uploaderName: 'Uploader 2', description: 'Description 2', comments: [], likes: 0, size: 10, link: 'https://filesampleshub.com/download/document/txt/sample1.txt'},
    {id: 3, name: 'Torrent 3', downloaded: 300, uploadDate: new Date(), uploaderName: 'Uploader 3', description: 'Description 3', comments: [], likes: 0, size: 10, link: 'https://filesampleshub.com/download/document/txt/sample1.txt'},
    {id: 4, name: 'Torrent 4', downloaded: 400, uploadDate: new Date(), uploaderName: 'Uploader 4', description: 'Description 4', comments: [], likes: 0, size: 10, link: 'https://filesampleshub.com/download/document/txt/sample1.txt'},
]

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
export class ProfileComponent {
    displayedColumns: string[] = ['id', 'name', 'downloaded', 'upload-date', 'delete'];
    dataSource = MOCK_DATA;

    register = new FormGroup({
        username: new FormControl('', [Validators.minLength(5)]),
        email: new FormControl('', [Validators.email]),
        password: new FormControl('', [Validators.minLength(6)]),
    });

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
}
