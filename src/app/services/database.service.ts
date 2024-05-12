import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Table } from '../model/tables';
import { Torrent } from '../model/torrent';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs : AngularFirestore) { }

  createUser(user: User) {
    return this.afs.collection<User>(Table.USERS).doc(user.id).set(user);
  }

  getUser(id: string) {
    return this.afs.collection<User>(Table.USERS).doc(id).valueChanges();
  }

  updateUser(user: User) {
    return this.afs.collection<User>(Table.USERS).doc(user.id).set(user);
  }

  createTorrent(name: string, description: string, link: string) {
    const torrent = {
      id: this.afs.createId(),
      name: name,
      description: description,
      link: link,
      uploaderId: '',
      uploadDate: new Date(),
      downloaded: 0,
      size: 0,
    };
    return this.afs.collection(Table.TORRENTS).doc(torrent.id).set(torrent);
  }
}
