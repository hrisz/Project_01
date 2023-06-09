fetch("http://127.0.0.1:3000/api/order")
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    let tableData = "";
    data.data.map((values) => {
      // Manipulasi data order dan masukkan ke dalam bentuk tabel
      tableData += `
                <tr>
				        <td>${values.order_id}</td>
                <td>${values.tanggal}</td>
                <td>${values.nama}</td>
                <td>${values.nomor_hp}</td>
                <td>${values.barang}</td>
                <td>${values.desc_masalah}</td>
                <td>${values.lokasi}</td>
				        <td><button type="button" class="btn btn-success" order-id="${values.order_id}">Update</button></td>
                <td><button type="button" class="btn btn-danger" order-id="${values.order_id}">Batalkan</button></td>
                </tr>`;
    });
    // Tampilkan data order ke dalam tabel
    document.getElementById("order-table").innerHTML = tableData;

    // Tambahkan event listener pada setiap tombol delete
    const deleteButtons = document.querySelectorAll(".btn-danger");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const order_id = event.target.getAttribute("order-id");
        // Kirim permintaan DELETE ke server
        fetch(`http://127.0.0.1:3000/api/order/${order_id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              // Sukses menghapus data
              event.target.parentNode.parentNode.remove();
              alert("Order berhasil dibatalkan"); // Menghapus baris tabel yang sesuai dengan tombol delete yang diklik
            } else {
              // Gagal menghapus data
              throw new Error("Gagal menghapus data");
            }
          })
          .catch((error) => {
            console.log("error", error);
            alert("Terjadi kesalahan pada server");
          });
      });
    });

    // Tambahkan event listener pada setiap tombol update
    const detailButtons = document.querySelectorAll(".btn-success");
    detailButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const order_id = event.target.getAttribute("order-id");
        window.location.href = `edit_order.html?order_id=${order_id}`;
      });
    });
  })
  .catch((error) => {
    console.log("error", error);
    alert("Terjadi kesalahan pada server");
  });