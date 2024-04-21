import { Comment } from './comment';

export interface Torrent {
    id: number;
    name: string;
    description: string;
    uploaderName: string;
    uploadDate: Date;
    downloaded: number;
    comments: Comment[];
}