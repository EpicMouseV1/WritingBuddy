chrome.commands.onCommand.addListener((command) => {
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {command: "ctrl+shift+y"});
        // do something with response here, not outside the function
        console.log(response);
      })();
  });