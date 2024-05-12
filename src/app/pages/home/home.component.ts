import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { Torrent } from '../../model/torrent';
import { RouterLink } from '@angular/router';
import { YarrTimePipe } from '../../pipes/yarr-time.pipe';
import { TorrentSizePipe } from "../../pipes/torrent-size.pipe";
import { TorrentActionsComponent } from "../../components/torrent-actions/torrent-actions.component";
import { DatabaseService } from '../../services/database.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatExpansionModule,
        MatTableModule,
        RouterLink,
        YarrTimePipe,
        TorrentSizePipe,
        TorrentActionsComponent
    ]
})
export class HomeComponent implements OnInit {
    displayedColumns: string[] = ['name', 'size', 'upload-date', 'icons'];
    dataSource: Torrent[] = [];
    
    constructor(private dbService: DatabaseService) {}

    ngOnInit() {
        this.dbService.getAllTorrents().subscribe((torrents) => {
            this.dataSource = torrents;
        });
    }
}
