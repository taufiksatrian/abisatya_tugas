import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from "../api.service";
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buku',
  templateUrl: './buku.page.html',
  styleUrls: ['./buku.page.scss'],
})
export class BukuPage {
  id: any;
  nama: any;
  jenis: any;
  jumlah: any;
  buku: any[] = [];

  constructor(
    private authService: AuthenticationService,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
  ) {
    this.getBuku();
  }

  ngOnInit() {
    console.log('cek fungsi halaman event init jalan');
  }

  ionViewDidEnter() {
    console.log("jika selesai loading");
    this.getBuku();
  }

  getBuku() {
    this._apiService.getBuku().subscribe((res: any) => {
      console.log("sukses", res);
      this.buku = res;
    }, (error: any) => {
      console.log("gagal", error);
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal memuat data buku',
        buttons: ['OK']
      }).then(res => {
        res.present();
      })
    })
  }

  deleteBuku(id: string) {
    this.alertController.create({
      header: 'Perhatian',
      subHeader: 'Yakin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('dibatalkan', data);
          }
        },
        {
          text: 'Yakin',
          handler: (data: any) => {
            //jika tekan yakin
            this._apiService.deleteBuku(id).subscribe((res: any) => {
              console.log("sukses", res);
              this.getBuku();
            }, (error: any) => {
              console.log("error", error);
              this.alertController.create({
                header: 'Notifikasi',
                message: 'gagal memuat data buku',
                buttons: ['OK']
              }).then(res => {
                res.present();
              })
            })
          }
        }
      ]
    }).then(res => {
      res.present();
    })
  }

  logout() {
    this.authService.logout(); // lempar ke authService lalu cari fungsi logout
    this.router.navigateByUrl('/', { replaceUrl: true }); // alihkan ke halama
  }

}
