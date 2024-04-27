import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Torrent } from '../../model/torrent';
import { RouterLink } from '@angular/router';
import { YarrTimePipe } from '../../pipes/yarr-time.pipe';
import { TorrentSizePipe } from "../../pipes/torrent-size.pipe";

const MOCK_DATA: Torrent[] = [
    { id: 1, name: 'Torrent 1', downloaded: 100, uploadDate: new Date(), uploaderName: 'Uploader 1', description: 'Description 1', comments: [], likes: 0, size: 100, link: 'https://filesamples.com/samples/document/txt/sample3.txt'},
    { id: 2, name: 'Torrent 2', downloaded: 200, uploadDate: new Date(), uploaderName: 'Uploader 2', description: 'Description 2', comments: [], likes: 0, size: 100, link: 'https://filesampleshub.com/download/document/txt/sample1.txt'},
    { id: 3, name: 'Torrent 3', downloaded: 300, uploadDate: new Date(), uploaderName: 'Uploader 3', description: 'Description 3', comments: [], likes: 0, size: 100, link: 'https://filesampleshub.com/download/document/txt/sample1.txt'},
    { id: 4, name: 'Torrent 4', downloaded: 400, uploadDate: new Date(), uploaderName: 'Uploader 4', description: 'Description 4', comments: [], likes: 0, size: 100, link: 'https://filesampleshub.com/download/document/txt/sample1.txt'},
]

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        RouterLink,
        YarrTimePipe,
        TorrentSizePipe
    ]
})
export class HomeComponent {
    displayedColumns: string[] = ['name', 'size', 'upload-date', 'icons'];
    dataSource = MOCK_DATA;
    
    likeTorrent(torrentId: number) {
        console.log(`Like torrent with id ${torrentId}`);
    }

    dislikeTorrent(torrentId: number) {
        console.log(`Dislike torrent with id ${torrentId}`);
    }
}
