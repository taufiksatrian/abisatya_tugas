import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { ApiService } from "../api.service";
import { Http } from "@capacitor-community/http";

@Component({
  selector: 'app-buku-edit',
  templateUrl: './buku-edit.page.html',
  styleUrls: ['./buku-edit.page.scss'],
})
export class BukuEditPage implements OnInit {
  id_buku: any;
  nama_buku: any;
  jenis_buku: any;
  jumlah_buku: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public LoadingController: LoadingController,
  ) {
    this.route.params.subscribe((param: any) => {
      this.id_buku = param.id_buku;
      console.log(this.id_buku);
      this.ambilBuku(this.id_buku);
   })
  }

  ngOnInit() {
  }

  ambilBuku(id_buku: string) {
    this._apiService.ambilBuku(id_buku).subscribe((res: any) => {
      console.log('sukses', res);
      let buku = res;
      //console.log(buku);
      this.nama_buku = buku.nama_buku;
      this.jenis_buku = buku.jenis_buku;
      this.jumlah_buku = buku.jumlah_buku;
    }, (error: any) => {
      console.log('error', error);
      alert('gagal ambil data');
    })
  }

  editBuku() {
    let url = this._apiService.apiURL() + "/edit.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: {
        id_buku: this.id_buku,
        nama_buku: this.nama_buku,
        jenis_buku: this.jenis_buku,
        jumlah_buku: this.jumlah_buku,
      },
    }).then((data) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Edit Data Buku',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/buku');
    }, (err) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Edit Data Buku',
        buttons: ['OK']
      }).then(res => {
        res.present()
      });
    })
  }

}
