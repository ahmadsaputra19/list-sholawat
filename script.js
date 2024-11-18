//To-top
const toTopBtn = document.querySelector('.logoSholawat');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) { // Ubah nilai 100 sesuai dengan posisi scroll yang diinginkan
        toTopBtn.classList.add('show');
    } else {
        toTopBtn.classList.remove('show');
    }
});

toTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//Hubungi Kami
document.getElementById('whatsapp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let hadroh = document.getElementById('hadroh').value;
    let message = document.getElementById('message').value;

    let whatsappNumber = '6289603170126';
    let whatsappMessage = `Assalamu'alaikum, nama saya ${name}.\nGroup hadroh saya: ${hadroh}.\nPesan saya: ${message}`;

    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappURL, '_blank');
});


//Search Dinamis
document.getElementById("search-input").addEventListener("input", function() {
    var searchInput = this.value.trim().toLowerCase();
    var resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (searchInput === "") {
        return; // Exit if the search input is empty
    }

    var divs = document.querySelectorAll(".content-div");

    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        var divId = div.getAttribute("id").toLowerCase();

        if (divId.includes(searchInput)) {
            var resultItem = document.createElement("div");
            resultItem.textContent = divId;
            resultItem.addEventListener("click", function() {
                document.getElementById(this.textContent).scrollIntoView({ behavior: 'smooth' });
            });
            resultsContainer.appendChild(resultItem);
        }
    }
});

document.getElementById('search-input').addEventListener('input', function() {
    if (this.value) {
        this.classList.add('has-text');
    } else {
        this.classList.remove('has-text');
    }
});

// Fungsi Install
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

// Event listener untuk menangkap beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    // Mencegah prompt default
    e.preventDefault();
    // Simpan event
    deferredPrompt = e;
    // Tampilkan tombol install
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        // Sembunyikan tombol install
        installBtn.style.display = 'none';
        // Tampilkan prompt instalasi
        deferredPrompt.prompt();
        // Tunggu hasil dari prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            // Reset deferredPrompt agar tidak bisa dipanggil kembali
            deferredPrompt = null;
        });
    });
});

// Optional: Sembunyikan tombol ketika aplikasi sudah terinstal
window.addEventListener('appinstalled', () => {
    console.log('PWA telah diinstal');
    installBtn.style.display = 'none';
});

// // 2. Menangani update-btn untuk muncul setiap Kamis sore
// function checkForThursdayAfternoon() {
//     const now = new Date();
//     const dayOfWeek = now.getDay(); // Kamis = 4
//     const hours = now.getHours(); // Sore dimulai dari jam 15.00
//     if (dayOfWeek === 4 && hours >= 15) {
//       document.getElementById('update-btn').style.display = 'block';
//     } else {
//       document.getElementById('update-btn').style.display = 'none';
//     }
//   };
  
//   // Panggil fungsi setiap menit untuk mengecek waktu
//   setInterval(checkForThursdayAfternoon, 60000);
//   checkForThursdayAfternoon(); // Panggilan awal saat halaman dimuat

// 3. Menangani ios-popup
// const iosPopupClosed = localStorage.getItem('close-popup-btn');
// if (!iosPopupClosed) {
//   document.getElementById('ios-popup').style.display = 'block';
// }

// document.getElementById('close-popup-btn').addEventListener('click', () => {
//   document.getElementById('ios-popup').style.display = 'none';
//   localStorage.setItem('ios-popup-closed', 'true');
// });
// 1. Deteksi platform iOS secara lebih spesifik
// const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// // 2. Cek apakah popup sudah pernah ditutup
// const iosPopupClosed = localStorage.getItem('ios-popup-closed');

// // 3. Tambahan pengecekan agar popup hanya muncul di perangkat mobile, bukan di desktop
// const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// if (isIOS && isMobile && !iosPopupClosed) {
//   // 4. Tampilkan popup jika platform adalah iOS dan popup belum pernah ditutup
//   document.getElementById('ios-popup').style.display = 'block';
// } else {
//   // 5. Sembunyikan popup jika tidak di iOS atau popup sudah pernah ditutup
//   document.getElementById('ios-popup').style.display = 'none';
// };

// // 6. Tombol untuk menutup popup
// document.getElementById('close-popup-btn').addEventListener('click', () => {
//   document.getElementById('ios-popup').style.display = 'block';
//   localStorage.setItem('ios-popup-closed', 'true');
// });


// Mencegah aksi copy
document.addEventListener('copy', function(e) {
  e.preventDefault();
  alert('Teks tidak bisa dicopy!');
});

// Mencegah klik kanan
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  // alert('Klik kanan dinonaktifkan!');
});

 // Event listener untuk redirect ketika opsi dipilih
 document.getElementById('pilihan').addEventListener('change', function() {
  var url = this.value;
  if (url) {
      window.location.href = url; // Redirect ke halaman yang dipilih
  }
});
