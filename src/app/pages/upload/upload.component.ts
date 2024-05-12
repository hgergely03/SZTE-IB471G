import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from '../../services/database.service';

@Component({
    selector: 'app-upload',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './upload.component.html',
    styleUrl: './upload.component.scss'
})
export class UploadComponent {
    upload = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        link: new FormControl('', [Validators.required]),
        size: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    });

    constructor(private dbService: DatabaseService, private snackbar: MatSnackBar) { }

    uploadTorrent() {
        if (this.upload.invalid) {
            return;
        }

        this.dbService.createTorrent(
            this.upload.value.name as string,
            this.upload.value.description as string,
            this.upload.value.link as string,
            this.upload.value.size as string).then(() => {
                this.upload.reset();
                this.upload.markAsUntouched();
                this.snackbar.open('Torrent successfully uploaded!', 'OK');
            }).catch((error) => {
                console.error('Error uploading torrent', error);
            });
    }
}
