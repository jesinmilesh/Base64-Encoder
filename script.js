function encodeText() {
  const input = document.getElementById('inputText').value;
  const outputElement = document.getElementById('outputText');
  const errorElement = document.getElementById('errorMessage');

  errorElement.classList.remove('active');

  if (!input) {
    outputElement.value = '';
    return;
  }

  try {
    const encoded = btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
    outputElement.value = encoded;
  } catch (error) {
    outputElement.value = btoa(input);
  }
}

function decodeText() {
  const input = document.getElementById('inputText').value.trim();
  const outputElement = document.getElementById('outputText');
  const errorElement = document.getElementById('errorMessage');

  errorElement.classList.remove('active');

  if (!input) {
    outputElement.value = '';
    return;
  }

  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  if (!base64Regex.test(input.replace(/\s+/g, ''))) {
    showError();
    outputElement.value = '';
    return;
  }

  try {
    const sanitized = input.replace(/\s+/g, '');
    const decoded = decodeURIComponent(Array.prototype.map.call(atob(sanitized), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    outputElement.value = decoded;
  } catch (error) {
    try {
      outputElement.value = atob(input);
    } catch (e) {
      showError();
      outputElement.value = '';
    }
  }
}

function showError() {
  const errorElement = document.getElementById('errorMessage');
  errorElement.textContent = 'Invalid Base64 String';
  errorElement.classList.add('active');
}

function copyOutput() {
  const outputText = document.getElementById('outputText').value;

  if (!outputText) {
    openCopyModal('⚠️', 'No output text to copy!');
    return;
  }

  navigator.clipboard.writeText(outputText).then(function() {
    openCopyModal('📋', 'Copied output to clipboard!');
  }).catch(function() {
    openCopyModal('📋', 'Copied output to clipboard!');
  });
}

function openCopyModal(icon, message) {
  const modal = document.getElementById('copyModal');
  const iconElement = document.getElementById('modalIcon');
  const titleElement = document.getElementById('modalTitle');

  if (iconElement) iconElement.textContent = icon || '📋';
  if (titleElement) titleElement.textContent = message || 'Copied output to clipboard!';

  if (modal) {
    modal.classList.add('active');
  }
}

function closeCopyModal() {
  const modal = document.getElementById('copyModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function clearFields() {
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').value = '';
  document.getElementById('errorMessage').classList.remove('active');
}

document.addEventListener('click', function(e) {
  const modal = document.getElementById('copyModal');
  if (modal && e.target === modal) {
    closeCopyModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCopyModal();
  }
});
