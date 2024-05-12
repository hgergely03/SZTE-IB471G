import { Component, Input, OnInit } from '@angular/core';
import { Torrent } from '../../model/torrent';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TorrentActionsComponent } from "../../components/torrent-actions/torrent-actions.component";
import { YarrTimePipe } from '../../pipes/yarr-time.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-details',
    standalone: true,
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss',
    imports: [
        MatCardModule,
        MatDividerModule,
        TorrentActionsComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        YarrTimePipe
    ]
})
export class DetailsComponent implements OnInit {
    @Input()
    set id(id: number) {
        console.log('id', id);
    };

    user?: firebase.default.User | null;

    comment = new FormGroup({
        content: new FormControl('', Validators.required),
    });

    MOCK_DATA: Torrent =
        {
            id: "1", name: 'Torrent 1', downloaded: 100, uploadDate: new Date(), uploaderId: 'Uploader 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas tempor metus et luctus. Praesent viverra nulla eros, at venenatis sem commodo at. Donec mollis condimentum felis, efficitur interdum arcu placerat vitae. Nullam sed est fermentum, dapibus sem nec, congue libero.',
            comments: [
                { id: 1, torrentId: 1, content: 'Comment 1', userName: 'Author 1', date: new Date() },
                { id: 2, torrentId: 1, content: 'Comment 2', userName: 'Author 2', date: new Date() },
                { id: 3, torrentId: 1, content: 'Comment 3', userName: 'Author 3', date: new Date() }
            ], likes: 0, size: 100, link: 'https://filesamples.com/samples/document/txt/sample3.txt'
        };

    constructor(private auth: AuthService) {}

    ngOnInit(): void {
        this.auth.isLoggedIn().subscribe(user => {
          this.user = user;
        });
    }
}
