// Set target date to 21 December 2024 at midnight
const targetDate = new Date("2024-12-21T18:00:00").getTime(); 

// Function to update the countdown
function updateCountdown() {
  const now = new Date().getTime(); // Get current time
  const timeLeft = targetDate - now; // Calculate time left

  if (timeLeft <= 0) { // If countdown is finished
    document.getElementById("days").textContent = 0;
    document.getElementById("hours").textContent = 0;
    document.getElementById("minutes").textContent = 0;
    document.getElementById("seconds").textContent = 0;
    clearInterval(countdownInterval); // Stop the countdown
    return;
  }

  // Calculate days, hours, minutes, and seconds left
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update the countdown in HTML
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Start updating the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

  
  
    // UNTUK FILE LIST SONG
   // Fungsi untuk memeriksa elemen yang terlihat di viewport dan mengubah ukurannya
  function handleImageResize() {
    const images = document.querySelectorAll('.shaped-image, .shaped-image1, .shaped-image2, .shaped-image3');
  
    images.forEach(image => {
      const rect = image.getBoundingClientRect();
      const scrollY = window.scrollY;
  
      // Jika elemen terlihat di layar (dengan sedikit batasan untuk efek zoom)
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        // Jika gambar dalam jangkauan, gambar akan membesar
        image.style.transform = 'scale(1.1)';
      } else {
        // Jika gambar di luar jangkauan, gambar akan mengecil
        image.style.transform = 'scale(0.9)';
      }
    });
  }
  
  // Menambahkan event listener untuk scroll
  window.addEventListener('scroll', handleImageResize);
  
  // Memanggil fungsi untuk memastikan gambar benar sejak awal
  handleImageResize();


document.addEventListener('DOMContentLoaded', () => {
    const seats = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      status: i % 3 === 0 ? 'taken' : 'available', // Simulasi status kursi
    }));
  
    const grid = document.querySelector('.grid');
    const confirmButton = document.getElementById('confirm-button');
    const ticketSelect = document.getElementById('ticket-select');
    const totalPriceElement = document.getElementById('total-price');
  
    const ticketPrice = 35000;
  
    let selectedSeats = [];
    let maxSeats = parseInt(ticketSelect.value) || 1;
  
    // Generate kursi
    seats.forEach((seat) => {
      const seatElement = document.createElement('button');
      seatElement.classList.add('seat', seat.status);
      seatElement.textContent = seat.id;
      seatElement.disabled = seat.status === 'taken';
      grid.appendChild(seatElement);
  
      seatElement.addEventListener('click', () => {
        if (!seatElement.classList.contains('selected')) {
          if (selectedSeats.length < maxSeats) {
            seatElement.classList.add('selected');
            selectedSeats.push(seat.id);
          } else {
            alert(`You can only select up to ${maxSeats} seat(s).`);
          }
        } else {
          seatElement.classList.remove('selected');
          selectedSeats = selectedSeats.filter((id) => id !== seat.id);
        }
        confirmButton.disabled = selectedSeats.length !== maxSeats;
      });
    });
  
    ticketSelect.addEventListener('change', () => {
      maxSeats = parseInt(ticketSelect.value) || 1;
      document.querySelectorAll('.seat.selected').forEach((el) => el.classList.remove('selected'));
      selectedSeats = [];
      confirmButton.disabled = true;
      const totalPrice = ticketPrice * maxSeats;
      totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    });
  
    confirmButton.addEventListener('click', () => {
      alert(`Seats selected: ${selectedSeats.join(', ')}`);
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      window.location.href = 'payment.html';

      function updateTotalPrice() {
        const ticketCount = parseInt(ticketSelect.value); // Ambil jumlah tiket yang dipilih
        const totalPrice = ticketPrice * ticketCount; // Hitung total harga
        totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`; // Tampilkan total harga
        localStorage.setItem('ticketCount', ticketCount); // Simpan jumlah tiket di localStorage
        localStorage.setItem('totalPrice', totalPrice); // Simpan harga total di localStorage
      
        // Aktifkan tombol konfirmasi jika jumlah tiket lebih dari 0
        if (ticketCount > 0) {
          confirmButton.disabled = false;
        } else {
          confirmButton.disabled = true;
        }
      }
      
      // Dengarkan perubahan pada dropdown jumlah tiket
      ticketSelect.addEventListener('change', updateTotalPrice);
      
      // Panggil fungsi untuk pertama kali saat halaman dimuat
      updateTotalPrice();
    });
  });
  
  // Check if payment is successful
const paymentStatus = localStorage.getItem("paymentStatus"); // Cek status pembayaran
const ticketCount = localStorage.getItem("ticketCount"); // Jumlah tiket
const totalAmount = localStorage.getItem("totalAmount"); // Total harga
const ticketContainer = document.getElementById("ticket-container");

if (paymentStatus === "success") {
  // Generate ticket(s)
  for (let i = 1; i <= ticketCount; i++) {
    const ticket = document.createElement("div");
    ticket.classList.add("ticket");
    ticket.innerHTML = `
      <h2>Ticket #${i}</h2>
      <p>Concert: Bahana Sorai Nusantara</p>
      <p>Date: Saturday, 21 Desember 2024</p>
      <p>Seat: Section A, Row ${i}, Seat ${i}</p>
      <p>Price: Rp 35,000</p>
    `;
    ticketContainer.appendChild(ticket);
  }
} else {
  // If no payment, show error message
  ticketContainer.innerHTML = "<p>Please complete your payment to view your tickets.</p>";
}

const audio = document.getElementById('background-music');
const toggleMusicBtn = document.getElementById('toggle-music-btn');

// Cek status musik saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
  // Mengambil status dari localStorage
  const isMusicPlaying = localStorage.getItem('isMusicPlaying') === 'true';

  if (isMusicPlaying) {
    audio.play();
    toggleMusicBtn.textContent = 'Pause Music';
  } else {
    audio.pause();
    toggleMusicBtn.textContent = 'Play Music';
  }
});

// Event listener untuk tombol play/pause musik
toggleMusicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    toggleMusicBtn.textContent = 'Pause Music';
    localStorage.setItem('isMusicPlaying', 'true'); // Menyimpan status musik
  } else {
    audio.pause();
    toggleMusicBtn.textContent = 'Play Music';
    localStorage.setItem('isMusicPlaying', 'false'); // Menyimpan status musik
  }
});

