import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { Torrent } from '../../model/torrent';

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
export class TorrentActionsComponent {
    @Input() torrent!: Torrent;

    likeTorrent(torrentId: number) {
        console.log(`Like torrent with id ${torrentId}`);
    }

    dislikeTorrent(torrentId: number) {
        console.log(`Dislike torrent with id ${torrentId}`);
    }
}
