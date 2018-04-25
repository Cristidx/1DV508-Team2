import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from '@firebase/util';

@Injectable()
export class CrudService {
  private items: Observable<any[]>;
  constructor(private af: AngularFireDatabase) { }

  getData(path: string) {
    return this.af.list(this.af.database.ref(path)).valueChanges();
  }

  create(item: any, path: string) {
    console.log(this.af.database.ref().toString() + path + '/');
    this.af.database.ref(path + '/').push(item, (error) => console.log(error));
  }

  update(item: any, path: string) {
    this.af.database.ref(path).update(item, (error) => console.log(error));
  }

  delete(path: string) {
    this.af.database.ref(path).remove((error) => console.log(error));
  }
}

