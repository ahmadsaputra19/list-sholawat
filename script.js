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


//menampilkan notifikasi
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(error => {
        console.log('Service Worker registration failed:', error);
      });
      
      // Meminta izin untuk notifikasi
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          } else {
            console.log('Notification permission denied.');
          }
        });
      }
  
      // Menangani pesan dari service worker
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data === 'new-content-available') {
          if (confirm('New lyrics are available. Refresh to update?')) {
            window.location.reload();
          }
        }
      });
    }
  });
  
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
