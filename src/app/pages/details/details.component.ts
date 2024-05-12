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
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute } from '@angular/router';

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
    id?: string;

    user?: firebase.default.User | null;

    comment = new FormGroup({
        content: new FormControl('', Validators.required),
    });

    torrent?: Torrent;

    constructor(private auth: AuthService, private dbService: DatabaseService, private activatedRoute: ActivatedRoute) {}

    params?: any;
    loggedIn?: any;
    torrents?: any;

    ngOnInit(): void {
        this.params = this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });

        this.loggedIn = this.auth.isLoggedIn().subscribe(user => {
          this.user = user;
        });

        this.torrents = this.dbService.getTorrent(this.id as string).subscribe(torrent => {
            this.torrent = torrent;
        });
    }


    ngOnDestroy(): void {
        this.params.unsubscribe();
        this.loggedIn.unsubscribe();
        this.torrents.unsubscribe();
    }
}
