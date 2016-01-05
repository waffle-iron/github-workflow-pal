chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const buildoGithub = '.*/github.*buildo/.*';
  const issuesPageRegex = RegExp(`${buildoGithub}/issues`);
  const newIssuePageRegex = RegExp(`${buildoGithub}/issues/new`);
  const pullRequestPageRegex = RegExp(`${buildoGithub}/pull/.*`);

  const oldInterface = !tab.url.match(RegExp('https://github.com/*'));

  if (tab.url.match(issuesPageRegex)) {
    chrome.tabs.sendMessage(tab.id, { onIssuesPage: true, oldInterface });
  }
  if (tab.url.match(newIssuePageRegex)) {
    chrome.tabs.sendMessage(tab.id, { onNewIssuePage: true, oldInterface });
  }
  if (changeInfo.status == 'complete' && tab.url.match(pullRequestPageRegex)) {
    chrome.tabs.sendMessage(tab.id, { onPRPage: true, oldInterface });
  }
});
