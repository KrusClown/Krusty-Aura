/* ═══════════════════════════════════════════
   KRUSTY AURA — Photo Upload Handler
   File: upload.js
   ═══════════════════════════════════════════ */

/**
 * Reads the selected image file and renders it
 * inside the avatar wrapper, replacing the placeholder.
 *
 * @param {Event} event - The file input change event
 */
function loadPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  /* Accept images only */
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const inner   = document.getElementById('avatar-inner');
    const overlay = document.getElementById('upload-overlay');

    /* Replace placeholder with the loaded image */
    inner.innerHTML = `
      <img
        src="${e.target.result}"
        alt="Profile photo"
      />
    `;

    /* Show the "Change photo" hover overlay */
    overlay.style.display = 'flex';
  };

  reader.onerror = function () {
    alert('Could not read the image. Please try another file.');
  };

  reader.readAsDataURL(file);
}
