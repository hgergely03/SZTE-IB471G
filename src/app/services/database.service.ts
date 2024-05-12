import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Table } from '../model/tables';

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
}
