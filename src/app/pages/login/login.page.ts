import { Component, OnInit } from '@angular/core';
import { UserUtil } from 'src/app/utils/user.util';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    const user = UserUtil.get();
    if (user) this.navCtrl.navigateRoot('/');
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present();
    this.service
      .auth(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => {
          loading.dismiss();
          this.showError("Falha ao autenticar!")
        },
      );
  }

  async showSuccess(data) {
    UserUtil.set(data);
    this.navCtrl.navigateRoot('/');

  }

  async showError(messageError) {
    const toast = await this.toastCtrl.create({
      message: messageError,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Fechar"
    });
    toast.present();
  }


}
