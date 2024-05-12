import { Comment } from './comment';

export interface Torrent {
    id: string;
    name: string;
    description: string;
    link: string;
    uploaderId: string;
    uploadDate: Date;
    downloaded: number;
    size: number;
    likes: number;
    dislikes: number;
    comments: Comment[];
}