chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const buildoGithub = '.*/github.*buildo/.*';
  const issuesPageRegex = RegExp(`${buildoGithub}/issues`);
  const issuePageRegex = RegExp(`${buildoGithub}/issues/.+`);
  const newIssuePageRegex = RegExp(`${buildoGithub}/issues/new`);
  const pullRequestPageRegex = RegExp(`${buildoGithub}/pull/.*`);

  const oldInterface = !tab.url.match(RegExp('https://github.com/*'));

  if (changeInfo.status !== 'complete') {
    return;
  }

  if (tab.url.match(issuesPageRegex)) {
    chrome.tabs.sendMessage(tab.id, { onIssuesPage: true, oldInterface });
  }
  if (tab.url.match(issuePageRegex)) {
    chrome.tabs.sendMessage(tab.id, { onIssuePage: true, oldInterface });
  }
  if (tab.url.match(newIssuePageRegex)) {
    chrome.tabs.sendMessage(tab.id, { onNewIssuePage: true, oldInterface });
  }
  if (tab.url.match(pullRequestPageRegex)) {
    chrome.tabs.sendMessage(tab.id, { onPRPage: true, oldInterface });
  }
});
