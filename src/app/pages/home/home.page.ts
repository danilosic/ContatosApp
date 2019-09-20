import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public contatos: any[];

  constructor(
    private service: DataService,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.service.getContatos()
      .subscribe(
        (res: any) => {
          this.contatos = res;
        })
  }



  async showMessage(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Fechar'
    });
    toast.present();
  }

}
