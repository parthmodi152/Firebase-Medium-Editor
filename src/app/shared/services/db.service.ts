import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getUserText(uid: string) {
    return this.firestore
                .collection('medium-editor')
                .snapshotChanges()
                .pipe( map( actions =>
                  actions.filter( a =>
                  {
                    return a.payload.doc.id == uid
                  })
                    .map( a =>
                    {
                      const data:any = a.payload.doc.data();
                      const id = a.payload.doc.id;
                      return data.text
                    }
                  )
                ));
  }

  UpdateText(uid: string, text: string) {
    this.firestore.collection('medium-editor').doc(uid).set({
      text: text
    });
  }
}
