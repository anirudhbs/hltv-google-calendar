const link = document.getElementById('add-to-calendar')

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action !== 'SCRAPE_DONE') {
    return
  }

  const { team1, team2, event, timestamp } = request.data
  const parsedTimestamp = parseInt(timestamp)

  const startTime = getDateForUrl(parsedTimestamp)
  const endTime = getDateForUrl(parsedTimestamp)

  const url =
    `https://www.google.com/calendar/render?action=TEMPLATE&text=` +
    `${team1}+vs+${team2}+(${event})` +
    `&dates=${startTime}%2F${endTime}`
  link.setAttribute('href', url)
})

window.onload = function () {
  chrome.tabs.executeScript(
    null,
    {
      file: 'scrapePage.js',
    },
    function () {
      if (chrome.runtime.lastError) {
        console.log(
          `There was an error injecting script:\n${chrome.runtime.lastError.message}`
        )
      }
    }
  )
}

function getDateForUrl(timestamp) {
  return new Date(timestamp).toISOString().replace(/[-:.]/g, '')
}
