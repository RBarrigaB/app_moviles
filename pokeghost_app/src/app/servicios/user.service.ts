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
  async addUser(user: Usuario) {
    const userRef = collection(this.firestore,'Usuarios');
    try {
      return await addDoc(userRef, user);
    } catch (error) {
      return console.log('Error: ', error);
    }
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
  async updateUser(user: Usuario) {
    const userRef = doc(this.firestore,`Usuarios/${user.id}`);
    const userToUpdate = { ...user };
    try {
      return await updateDoc(userRef, userToUpdate);
    } catch (error) {
      return console.log('Error: ', error);
    }
  }
  //Eliminar usuario
  async deleteUser(user: Usuario) {
    const userRef = doc(this.firestore,`Usuarios/${user.id}`)
    try {
      return await deleteDoc(userRef);
    } catch (error) {
      return console.log('Error: ', error);
    }
  }

}
