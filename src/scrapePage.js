function getDetailsFromPage() {
  const team1 = document.getElementsByClassName('teamName')[0].innerText
  const team2 = document.getElementsByClassName('teamName')[1].innerText
  const timestamp = document.getElementsByClassName('time')[0].getAttribute('data-unix')

  return {
    team1,
    team2,
    timestamp
  }
}

chrome.runtime.sendMessage({
  action: "SCRAPE_DONE",
  source: getDetailsFromPage()
});
