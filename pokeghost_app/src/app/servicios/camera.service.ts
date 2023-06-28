import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import {CameraSource} from '@capacitor/camera/dist/esm/definitions'

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  image:any;

  constructor() { }

  public async addPhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 100,
      allowEditing: false
    });
    this.image=capturedPhoto.dataUrl;
  }
}
