const API_URL = 'https://script.google.com/macros/s/AKfycbysDO4Td64KxTinbrO4FnSMlrYVZzkHBoX0IgJcz4-UDHrCjC0OlKs1Fzzj42Z4SOgRmg/exec';
const form = document.getElementById('submit-form');
const pinBox = document.getElementById('pins');

form.addEventListener('submit', e => {
  e.preventDefault();
  const link = document.getElementById('pinLink').value;
  fetch(API_URL, {
    method: 'POST',
    body: new URLSearchParams({ link })
  }).then(() => {
    form.reset();
    loadPins();
  });
});

function loadPins() {
  fetch(API_URL)
    .then(res => res.json())
    .then(pins => {
      pinBox.innerHTML = '';
      pins.reverse().forEach(pin => {
        const pinId = extractPinId(pin.link);
        const div = document.createElement('div');
        div.className = 'pin';
        div.innerHTML = `
          <div class="embed-container">
            <iframe src="https://assets.pinterest.com/ext/embed.html?id=${pinId}" loading="lazy"></iframe>
          </div>
          <button class="delete-btn" onclick="deletePin('${pin.link}')">Delete</button>
        `;
        pinBox.appendChild(div);
      });
    });
}

function deletePin(link) {
  fetch(`${API_URL}?link=${encodeURIComponent(link)}`, { method: 'DELETE' })
    .then(() => loadPins());
}

function extractPinId(link) {
  const match = link.match(/pin\/(\d+)/);
  return match ? match[1] : '';
}

loadPins();

