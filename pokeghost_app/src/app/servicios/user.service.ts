import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc,docData } from '@angular/fire/firestore';
import Usuario from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) {}
  //Crear usuario
  addUser(user: Usuario) {
    const userRef = collection(this.firestore,'Usuarios');
    return addDoc(userRef, user).catch(error => console.log('Error: ',error));
  }
  //Traer lista de usuarios  
  getUsers(): Observable<Usuario[]>{
    const userRef = collection(this.firestore,'Usuarios');
    return collectionData(userRef,{idField: 'id'}) as Observable<Usuario[]>;
  }
  //Traer usuario 
  getUser(user: Usuario) {
    const userRef = doc(this.firestore,`Usuarios/${user.id}`)
    return docData(userRef);
  }
  //Actualizar usuario
  updateUser(user: Usuario) {
    const userRef = doc(this.firestore,`Usuarios/${user.id}`);
    const userToUpdate = { ...user };
    return updateDoc(userRef,userToUpdate).catch(error => console.log('Error: ',error));
  }
  //Eliminar usuario
  deleteUser(user: Usuario) {
    const userRef = doc(this.firestore,`Usuarios/${user.id}`)
    return deleteDoc(userRef).catch(error => console.log('Error: ',error));
  }

}
