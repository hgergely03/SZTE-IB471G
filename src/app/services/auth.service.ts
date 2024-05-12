import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    return this.auth.user;
  }

  changePassword(password: string) {
    return this.auth.currentUser.then(user => {
      return user?.updatePassword(password);
    });
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  async getUserId() {
    const user = await this.auth.currentUser;
    return user?.uid;
  }
}
