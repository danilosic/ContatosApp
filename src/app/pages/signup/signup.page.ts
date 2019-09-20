import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { UserUtil } from 'src/app/utils/user.util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public form: FormGroup;



  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private LoadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.LoadingCtrl.create({ message: "Cadastrando..." });
    loading.present();

    this.service.createUser(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => this.showError("Falha..."),
      );
  }

  async showSuccess(data) {
    const alert = await this.alertCtrl.create({
      message: "Bem vindo",
      buttons: [
        {
          text: "Continuar", handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });
    alert.present();

  }

  async showError(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Fechar"
    });
    toast.present();
  }

}
