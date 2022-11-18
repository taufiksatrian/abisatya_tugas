import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient,
  ) { }

  //link API
  apiURL() {
    return "http://localhost/api/";
  }

  getBuku() {
    return this.http.get(this.apiURL() + '/tampil.php');
  }

  deleteBuku(id: string) {
    return this.http.delete(this.apiURL() + '/hapus.php?id=' + id);
  }

  ambilBuku(id_buku: string) {
    return this.http.get(this.apiURL() + '/lihat.php?id_buku=' + id_buku);
  }

}
