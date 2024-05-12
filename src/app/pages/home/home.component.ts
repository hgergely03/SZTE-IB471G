import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Torrent } from '../../model/torrent';
import { RouterLink } from '@angular/router';
import { YarrTimePipe } from '../../pipes/yarr-time.pipe';
import { TorrentSizePipe } from "../../pipes/torrent-size.pipe";
import { TorrentActionsComponent } from "../../components/torrent-actions/torrent-actions.component";
import { DatabaseService } from '../../services/database.service';
import { Engagement } from '../../model/engagement';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatExpansionModule,
        MatTableModule,
        MatCardModule,
        RouterLink,
        YarrTimePipe,
        TorrentSizePipe,
        TorrentActionsComponent
    ]
})
export class HomeComponent implements OnInit {
    displayedColumns: string[] = ['name', 'size', 'upload-date', 'icons'];
    dataSource: Torrent[] = [];
    mostLikedTorrent?: Torrent;
    engagement?: Engagement;
    
    constructor(private dbService: DatabaseService) {}

    ngOnInit() {
        this.dbService.getAllTorrents().subscribe((torrents) => {
            this.dataSource = torrents;
        });

        this.dbService.getMostLikedTorrent().subscribe((engagement) => {
            this.engagement = engagement[0];
            this.dbService.getTorrent(engagement[0].fileId).subscribe((torrent) => {
                this.mostLikedTorrent = torrent;
            });
        });
    }
}
