<?php 

require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$pesan = [];
$id_buku = $data['id_buku'];
$nama_buku = $data['nama_buku'];
$jenis_buku = $data['jenis_buku'];
$jumlah_buku = $data['jumlah_buku'];

$query = mysqli_query($con,"UPDATE buku SET nama_buku='$nama_buku',jenis_buku='$jenis_buku',jumlah_buku='$jumlah_buku' WHERE id_buku='$id_buku'");
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