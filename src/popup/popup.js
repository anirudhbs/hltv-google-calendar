const button = document.getElementById('add-to-calendar')

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "SCRAPE_DONE") {

    const { team1, team2, event, timestamp } = request.data
    const parsedTimestamp = parseInt(timestamp)

    const startTime = getDateForUrl(parsedTimestamp)
    const endTime = getDateForUrl(parsedTimestamp)

    button.addEventListener('click', () => {
      const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=` +
        `${team1}+vs+${team2}+at+${event}` +
        `&dates=${startTime}%2F${endTime}`
      window.open(url, '_blank').focus();
    })
  }
});

window.onload = function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "scrapePage.js"
  }, function() {
    if (chrome.runtime.lastError) {
      console.log(`There was an error injecting script:\n${chrome.runtime.lastError.message}`)
    }
  });
}

function getDateForUrl(timestamp) {
  return new Date(timestamp).toISOString().replace(/[-:.]/g,'')
}
