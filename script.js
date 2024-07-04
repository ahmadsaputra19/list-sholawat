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