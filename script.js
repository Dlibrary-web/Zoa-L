// Load materi dari localStorage saat halaman dibuka
window.onload = function () {
  const saved = JSON.parse(localStorage.getItem('materiList')) || [];
  saved.forEach(materi => buatCard(materi.judul, materi.isi, materi.link));
};

function toggleForm() {
  document.getElementById('uploadForm').classList.toggle('hidden');
}

function tambahMateri() {
  const judul = document.getElementById('judulInput').value.trim();
  const isi = document.getElementById('materiInput').value.trim();
  const link = document.getElementById('linkInput').value.trim();

  if (!judul || !isi || !link) return alert("Semua kolom harus diisi!");

  const materiList = JSON.parse(localStorage.getItem('materiList')) || [];
  materiList.push({ judul, isi, link });
  localStorage.setItem('materiList', JSON.stringify(materiList));

  buatCard(judul, isi, link);

  document.getElementById('judulInput').value = '';
  document.getElementById('materiInput').value = '';
  document.getElementById('linkInput').value = '';
  document.getElementById('uploadForm').classList.add('hidden');
}

function buatCard(judul, isi, link) {
  const container = document.getElementById('bookContainer');
  const card = document.createElement('div');
  card.className = 'book-card';
  card.setAttribute('data-title', judul);

  card.innerHTML = `
    <h3>${judul}</h3>
    <p class="materi">${isi}</p>
    <div>
      <button onclick="window.open('${link}', '_blank')">Read</button>
      <button onclick="editMateri('${judul}')" title="Edit">↺</button>
    </div>
  `;

  container.appendChild(card);
}

function filterBooks() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const books = document.querySelectorAll('.book-card');

  books.forEach(book => {
    const title = book.getAttribute('data-title').toLowerCase();
    if (title.includes(keyword)) {
      book.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
}
function editMateri(judul) {
  const materiList = JSON.parse(localStorage.getItem('materiList')) || [];
  const data = materiList.find(m => m.judul === judul);
  if (!data) return alert("Materi tidak ditemukan.");

  // Isi form dengan data lama
  document.getElementById('judulInput').value = data.judul;
  document.getElementById('materiInput').value = data.isi;
  document.getElementById('linkInput').value = data.link;

  // Tampilkan form
  document.getElementById('uploadForm').classList.remove('hidden');

  // Hapus data lama agar bisa diganti
  const updatedList = materiList.filter(m => m.judul !== judul);
  localStorage.setItem('materiList', JSON.stringify(updatedList));

  // Hapus dari tampilan
  const cards = document.querySelectorAll('.book-card');
  cards.forEach(card => {
    if (card.getAttribute('data-title') === judul) {
      card.remove();
    }
  });
}