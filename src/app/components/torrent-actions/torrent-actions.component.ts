import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { Torrent } from '../../model/torrent';
import { DatabaseService } from '../../services/database.service';
import { Engagement } from '../../model/engagement';

@Component({
    selector: 'app-torrent-actions',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
    ],
    templateUrl: './torrent-actions.component.html',
    styleUrl: './torrent-actions.component.scss'
})
export class TorrentActionsComponent implements OnInit {
    @Input() torrent!: Torrent;
    engagement?: Engagement;

    constructor(private dbService: DatabaseService) { }

    ngOnInit(): void {
        this.dbService.getEngagementByTorrentId(this.torrent.id).subscribe(engagement => {
            this.engagement = engagement;
        });    
    }

    downloadTorrent() {
        this.dbService.downloadTorrent(this.engagement as Engagement);
    }

    likeTorrent() {
        this.dbService.likeTorrent(this.engagement as Engagement);
    }

    dislikeTorrent() {
        this.dbService.dislikeTorrent(this.engagement as Engagement);
    }
}
