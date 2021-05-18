const button = document.getElementById('add-to-calendar')

button.addEventListener('click', () => {
  const url = 'about:blank'
  window.open(url, '_blank').focus();
})
