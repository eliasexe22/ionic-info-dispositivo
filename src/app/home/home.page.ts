import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Device } from '@capacitor/device';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote],
})
export class HomePage implements OnInit {
  deviceInfo: any = {
    model: 'Cargando...',
    platform: 'Cargando...',
    operatingSystem: 'Cargando...',
    osVersion: 'Cargando...',
    manufacturer: 'Cargando...'
  };

  // Inyectamos NgZone y ChangeDetectorRef
  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDeviceInfo();
  }

  async loadDeviceInfo() {
    try {
      const info = await Device.getInfo();
      
      // Usamos NgZone para avisar a Angular que estamos en un proceso asíncrono
      this.ngZone.run(() => {
        this.deviceInfo = info;
        // Forzamos la actualización de la vista
        this.cdr.detectChanges();
        console.log('Datos inyectados en la vista:', info);
      });

    } catch (error) {
      console.error('Error al obtener info:', error);
    }
  }
}