import * as firebase from 'firebase/app';

export class User {
    private user: firebase.User;
    private admin = false;

    set Admin(value: boolean) {
        this.admin = value;
    }

    get Admin() {
        return this.admin;
    }

    set FirebaseUser(value: firebase.User) {
        this.user = value;
    }

    get FirebaseUser() {
        return this.user;
    }
}
