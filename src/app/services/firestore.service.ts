import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  public role: any;

  constructor(private afs: AngularFirestore) {}

  async addUser(user: User) {
    let newUser: User = {
      email: user.email,
      password: user.password,
      displayName: user.name + ' ' + user.lastName,
      photoURL: user.photoURL,
      name: user.name,
      lastName: user.lastName,
      age: user.age,
      dni: user.dni,
      insurance: user.insurance,
      imageUrl: user.imageUrl,
      specialties: user.specialties,
      role: user.role,
      uid: user.uid,
      approved: user.approved,
    };

    return await this.afs.collection('users').add(newUser);
  }

  getUserData(uid: any) {
    var data: any;
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });    
  }

  getAllUsers() {
    return this.afs.collection('users').valueChanges();
  }

  getUserRole(uid: any) {
    var data: any;
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data()['role'];
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAllSpecialists() {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('users')
      .where('role', '==', 'Doctor')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getSpecialties() {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('specialties')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  updateSpecialties(specialties: any) {
    return firebase
      .firestore()
      .collection('specialties')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            specialties: specialties,
          });
        });
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      });
  }
}
  
 
  

