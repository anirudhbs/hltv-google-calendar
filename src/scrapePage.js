function getDetailsFromPage() {
  const team1 = document.getElementsByClassName('teamName')[0].innerText.trim()
  const team2 = document.getElementsByClassName('teamName')[1].innerText.trim()
  const event = document.getElementsByClassName('event')[0].innerText.trim()
  const mapsDetails = document
    .getElementsByClassName('veto-box')[0]
    .innerText.trim()

  const timestamp = document
    .getElementsByClassName('time')[0]
    .getAttribute('data-unix')
    .trim()

  const numberOfMaps = mapsDetails.match(/(?!:Best of )\d/)[0]

  return {
    team1,
    team2,
    event,
    timestamp,
    numberOfMaps
  }
}

chrome.runtime.sendMessage({
  action: 'SCRAPE_DONE',
  data: getDetailsFromPage()
})
