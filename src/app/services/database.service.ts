import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Table } from '../model/tables';
import { Torrent } from '../model/torrent';
import { Comment } from '../model/comment';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';
import { Engagement } from '../model/engagement';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs : AngularFirestore, private auth: AuthService) { }

  createUser(user: User) {
    return this.afs.collection<User>(Table.USERS).doc(user.id).set(user);
  }

  getUser(id: string) {
    return this.afs.collection<User>(Table.USERS).doc(id).valueChanges();
  }

  getUsers() {
    return this.afs.collection<User>(Table.USERS).valueChanges();
  }

  updateUser(user: User) {
    return this.afs.collection<User>(Table.USERS).doc(user.id).set(user);
  }

  async createTorrent(name: string, description: string, link: string, size: string) {
    const torrent = {
      id: this.afs.createId(),
      name: name,
      description: description,
      link: link,
      uploaderId: await this.auth.getUserId(),
      uploadDate: new Date(),
      downloaded: 0,
      size: parseInt(size),
    };

    const engagement: Engagement = {
      fileId: torrent.id,
      likeNumber: 0,
      dislikeNumber: 0,
      downloadNumber: 0,
    };

    this.afs.collection(Table.ENGAGEMENTS).doc(torrent.id).set(engagement);
    return this.afs.collection(Table.TORRENTS).doc(torrent.id).set(torrent);
  }

  getAllTorrents() {
    return this.afs.collection<Torrent>(Table.TORRENTS).valueChanges();
  }

  getTorrentsByUploaderId(uploaderId: string) {
    return this.afs.collection<Torrent>(Table.TORRENTS, ref => ref.where('uploaderId', '==', uploaderId).orderBy("uploadDate", "desc")).valueChanges();
  }

  getTorrent(id: string) {
    return this.afs.collection<Torrent>(Table.TORRENTS).doc(id).valueChanges();
  }

  deleteTorrent(id: string) {
    return this.afs.collection<Torrent>(Table.TORRENTS).doc(id).delete();
  }

  async createComment(torrentId: string, content: string) {
    const comment: Comment = {
      id: this.afs.createId(),
      fileId: torrentId,
      userId: (await this.auth.getUserId()) as string,
      content: content,
      date: new Date(),
    };

    return this.afs.collection(Table.COMMENTS).doc(comment.id).set(comment);
  }

  getCommentsByTorrentId(torrentId: string) {
    return this.afs.collection<Comment>(Table.COMMENTS, ref => ref.where('fileId', '==', torrentId).orderBy("date", "desc")).valueChanges();
  }


  getEngagementByTorrentId(torrentId: string) {
    return this.afs.collection<Engagement>(Table.ENGAGEMENTS).doc(torrentId).valueChanges();
  }

  likeTorrent(engagement: Engagement) {
    engagement.likeNumber++; 
    return this.afs.collection<Engagement>(Table.ENGAGEMENTS).doc(engagement.fileId).set(engagement);
  }

  dislikeTorrent(engagement: Engagement) {
    engagement.dislikeNumber++;
    return this.afs.collection<Engagement>(Table.ENGAGEMENTS).doc(engagement.fileId).set(engagement);
  }

  downloadTorrent(engagement: Engagement) {
    engagement.downloadNumber++;
    return this.afs.collection<Engagement>(Table.ENGAGEMENTS).doc(engagement.fileId).set(engagement);
  }

  getMostLikedTorrent() {
    return this.afs.collection<Engagement>(Table.ENGAGEMENTS, ref => ref.orderBy("likeNumber", "desc").limit(1)).valueChanges();
  }
}
