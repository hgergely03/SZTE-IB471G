export interface Torrent {
    id: string;
    name: string;
    description: string;
    link: string;
    uploaderId: string;
    uploadDate: Date;
    size: number;
    downloaded: number;
}