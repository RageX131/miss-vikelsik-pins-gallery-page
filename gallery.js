const API_URL = 'https://script.google.com/macros/s/AKfycbysDO4Td64KxTinbrO4FnSMlrYVZzkHBoX0IgJcz4-UDHrCjC0OlKs1Fzzj42Z4SOgRmg/exec';

fetch(API_URL)
  .then(res => res.json())
  .then(pins => {
    const container = document.getElementById('pin-gallery');
    container.innerHTML = '';

    if (pins.length === 0) {
      container.innerHTML = '<p>No pins submitted yet.</p>';
    }

    pins.reverse().forEach(pin => {
      const div = document.createElement('div');
      div.className = 'pin';
      div.innerHTML = `
        <div class="embed-container">
          <iframe src="https://assets.pinterest.com/ext/embed.html?id=${extractPinId(pin.link)}" loading="lazy"></iframe>
        </div>
      `;
      container.appendChild(div);
    });
  });

function extractPinId(link) {
  const match = link.match(/pin\/(\d+)/);
  return match ? match[1] : '';
}
