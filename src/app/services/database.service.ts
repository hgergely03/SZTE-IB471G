import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Table } from '../model/tables';
import { Torrent } from '../model/torrent';
import { AuthService } from './auth.service';

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
    
    return this.afs.collection(Table.TORRENTS).doc(torrent.id).set(torrent);
  }
}
