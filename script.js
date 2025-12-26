// DOM elementlerini tek yerde toplamak okunabilirliği artırır
const container = document.querySelector('.container');
const countEl = document.getElementById('count');
const amountEl = document.getElementById('amount');
const movieSelect = document.getElementById('movie');

// Rezerve olmayan koltukları seçiyoruz
const seats = document.querySelectorAll('.seat:not(.reserved)');

// Sayfa açıldığında localStorage verilerini yükle
loadFromLocalStorage();
updateTotal();

// Event Delegation:
// Tek tek her seat'e event vermek yerine container'dan yakalıyoruz
container.addEventListener('click', (e) => {
    // Tıklanan eleman seat mi ve reserved değil mi?
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected'); // Seç / bırak
        updateTotal(); // Toplamı güncelle
    }
});

// Film değiştiğinde sadece hesaplama yeterli
movieSelect.addEventListener('change', updateTotal);

function updateTotal() {
    // Seçili koltukları al
    const selectedSeats = container.querySelectorAll('.seat.selected');

    // NodeList → Array dönüşümünü kısa yoldan yapıyoruz
    const seatsArray = [...seats];

    // Seçilen koltukların indexlerini bul
    const selectedSeatIndexes = [...selectedSeats].map(seat =>
        seatsArray.indexOf(seat)
    );

    // Adet ve toplam tutar hesaplama
    const selectedSeatCount = selectedSeats.length;
    countEl.innerText = selectedSeatCount;
    amountEl.innerText = selectedSeatCount * movieSelect.value;

    // Verileri sakla
    saveToLocalStorage(selectedSeatIndexes);
}

function loadFromLocalStorage() {
    // Daha güvenli JSON parse (null kontrolü)
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];

    // Daha okunabilir index kontrolü
    seats.forEach((seat, index) => {
        if (selectedSeats.includes(index)) {
            seat.classList.add('selected');
        }
    });

    // Film seçimini geri yükle
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(seatIndexes) {
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndexes));
    localStorage.setItem('selectedMovieIndex', movieSelect.selectedIndex);
}
