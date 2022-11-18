<?php 
require 'koneksi.php';
$data = [];
$id_buku = $_GET['id_buku'];
$query = mysqli_query($con,"SELECT * FROM buku WHERE id_buku ='$id_buku'");
$jumlah = mysqli_num_rows($query);
if ($jumlah == 1) {
	$row = mysqli_fetch_object($query);
	$data = $row;
}

echo json_encode($data);
echo mysqli_error($con);

 ?>