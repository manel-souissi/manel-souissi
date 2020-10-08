
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from  "./config";
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.app = app;
    this.auth = app.auth();
    this.db = app.firestore();
  }
  async register(name, cin,email, password,id) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password,cin
    );
    return newUser.user.updateProfile({
      displayName: name,
      uid:id,
    });
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  resetPassword(email) {
    return this.auth.sendPasswordResetEmail(email);
  }
}
const firebase = new Firebase();
export default firebase;
