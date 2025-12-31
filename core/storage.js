// User data stored in chrome.storage.sync

export function getUserData() {
  return chrome.storage.sync.get([
    "salary",
    "hoursPerWeek",
    "saveInvestTimeline"
  ]);
}

export function setUserData(data) {
  return chrome.storage.sync.set(data);
}
