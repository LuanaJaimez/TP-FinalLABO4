import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from "firebase/auth";
import { Auth } from '@angular/fire/auth';
import { User } from '../models/user';
import { FirestoreService } from './firestore.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userCredential: UserCredential | any;
  userData: any; 

  constructor(public afauth: AngularFireAuth, 
              private router: Router, 
              private readonly auth: Auth,
              private firestoreService: FirestoreService,
              private toastr: ToastrService,
              private spinnerService: SpinnerService) { 
  }

  async sendEmail() {
    this.userCredential = this.auth.currentUser;
    return await sendEmailVerification(this.userCredential).then((res) => { 
        this.toastr.success("Envio de correo de verificación exitoso");
      })
      .catch(e => { 
        this.toastr.error(e.message);
      })
      .finally(() => { });
  }

  async login(email: string, password: string) {
    this.spinnerService.show();
    return await signInWithEmailAndPassword(this.auth, email, password)
    .then(res => {
      if (res.user.emailVerified) {
        this.getUserRole(this.auth.currentUser!.uid);
        this.firestoreService.getUserData(this.auth.currentUser!.uid)
      } else {
        this.userCredential = res;
        this.router.navigate(['verification'])
      }
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/internal-error':
          throw new Error('Credenciales Inválidas');
        default:
          throw new Error(error.message);
      }
    })
    .finally(() => { 
      this.spinnerService.hide();
    });
  }

  getUserRole(uid:any) {
    this.spinnerService.show();
    new Promise((resolve) => {
      this.firestoreService.getUserRole(uid).then((data) => {
        resolve(data);
      });
    })
    .then((data) => {
      this.redirect(data);
    })
    .catch((e) => {
      this.toastr.error(e.message);
    })
  }

  redirect(role: any) {
    if (role === 'Patient') {
      this.router.navigate(['patient']);
    }
    
    if (role === 'Doctor') {
      this.router.navigate(['doctor']);
    }
   
    if (role === 'Admin') {
      this.router.navigate(['admin']);
    }
    this.spinnerService.hide(); 
  }

  async register(user: User, files: any) {
    return await createUserWithEmailAndPassword(this.auth, user.email, user.password).then(res => {
      sendEmailVerification(res.user);
      this.router.navigate(['verification']);
    }).catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          this.toastr.error("Correo Invalido");
          break;
        case 'auth/email-already-in-use':
          this.toastr.error("Correo ya registrado");
          break;
        default:
          this.toastr.error(error.message);
          break;
      }
    });
  }

  async uploadUser(name: string,  lastName: string, url: string) {
    let auth = getAuth();
    return await updateProfile(auth.currentUser!, { displayName: name + ' ' + lastName, photoURL: url }).then().catch(
      (error) => console.log(error));
  }

  async logout() {
    return await this.afauth.signOut()
    .then(res => {
      this.router.navigate(['login']);
      
    })
    .catch(e => {
      throw new Error('Error');
    });
  }

  getAuth() {
    return this.afauth.authState;
  } 
}