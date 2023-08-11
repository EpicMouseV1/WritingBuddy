document.getElementById("reviewButton").addEventListener("click", () => {
    const selectedStyle = document.querySelector('input[name="style"]:checked').value;
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "reviewEmail"});
      if (selectedStyle) {
        chrome.tabs.sendMessage(tabs[0].id, { style: selectedStyle});
      }
    });

    const loader = document.createElement('div');
    loader.className= 'loader';
    document.getElementById("reviewButton").appendChild(loader);
    
  });

// document.getElementById("writingStyles").addEventListener('change', () => {
//   const selectedStyle = document.querySelector('#WritingStyles input[name="style"]:checked')
// })

document.getElementById("lang").addEventListener('change', () => {
  const selectedLang = document.querySelector('#lang select option:checked').value;
  if (selectedLang === 'russian') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { lang: "russian"});
    });
  } else if (selectedLang === 'english') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { lang: "english"});
    });
  };
});
