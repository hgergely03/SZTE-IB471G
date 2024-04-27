import { Comment } from './comment';

export interface Torrent {
    id: number;
    name: string;
    description: string;
    link: string;
    uploaderName: string;
    uploadDate: Date;
    downloaded: number;
    size: number;
    likes: number;
    comments: Comment[];
}