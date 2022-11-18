import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { ApiService } from "../api.service";
import { Http } from "@capacitor-community/http";

@Component({
  selector: 'app-buku-tambah',
  templateUrl: './buku-tambah.page.html',
  styleUrls: ['./buku-tambah.page.scss'],
})
export class BukuTambahPage implements OnInit {
  id_buku: any;
  nama_buku: any;
  jenis_buku: any;
  jumlah_buku: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  addBuku() {
    let url = this._apiService.apiURL() + "/tambah.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: {
        id_buku: this.id_buku,
        nama_buku: this.nama_buku,
        jenis_buku: this.jenis_buku,
        jumlah_buku: this.jumlah_buku
      },
    }).then((data) => {
      this.id_buku = '';
      this.nama_buku = '';
      this.jenis_buku = '';
      this.jumlah_buku = '';
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Input data Buku',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/buku');
    }, (error) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Input data Buku',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
    })
  }

}
