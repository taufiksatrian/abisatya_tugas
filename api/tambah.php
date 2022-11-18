<?php 

require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$pesan = [];
$id_buku = trim($data['id_buku']);
$nama_buku = trim($data['nama_buku']);
$jenis_buku = trim($data['jenis_buku']);
$jumlah_buku = trim($data['jumlah_buku']);

if ($id_buku != '' and $nama_buku != '' and $jenis_buku != '' and $jumlah_buku != '') {
	$query = mysqli_query($con,"INSERT INTO buku(id_buku,nama_buku,jenis_buku,jumlah_buku) 
    VALUES ('$id_buku','$nama_buku','$jenis_buku','$jumlah_buku')");

}else{
	$query = mysqli_query($con,"delete from buku where id_buku ='$id_buku'");
}
// if ($query) {
// 	http_response_code(201);
// 	$pesan['status'] = 'sukses';
// }else{
// 	http_response_code(422);
// 	$pesan['status'] = 'gagal';
// }
echo json_encode($pesan);
echo mysqli_error($con);
?>