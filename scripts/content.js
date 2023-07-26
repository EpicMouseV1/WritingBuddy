function sendRequestToGpt(userInput) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8001/text/' + userInput, true);
  xhr.send();
  return xhr;
}

async function getRecommendationsFromGPT(userInput) {
  try {
    const response = await fetch('http://localhost:8001/text/' + userInput);
    const responseGPT = await response.json();
    console.log(responseGPT);
    return responseGPT;
  } catch (error) {
    console.error(error);
  }
}

async function getResponseFromGPT(userInput) {
  try {
    const response = await fetch('http://localhost:8001/text2/' + userInput);
    const responseGPT = await response.json();
    console.log(responseGPT);
    return responseGPT;
  } catch (error) {
    console.error(error);
  }
}

function getEmail() {
  const selector = "div[aria-label='Message Body'], div[aria-label='Message text'], div.editable";
  const email = document.querySelector(selector);
  if (email) {
    const emailText = email.textContent;
    return emailText;
  }

  return null;
}

function getMessageBody() {
  const selector = "div[aria-label='Message Body'], div[aria-label='Message text'], div.editable";
  const messageBody = document.querySelector(selector);
  if (messageBody) {
    return messageBody;
  } else {
    return null;
  }
}

function replaceEmail(response) {
  const selector = "div[aria-label='Message Body'], div[aria-label='Message text'], div.editable";
  const email = document.querySelector(selector);
  if (email) {
    email.textContent = response;
  }
}

function getReplyButton(response) {
  const selector = "span.ams.bkH";
  const replyButton = document.querySelector(selector);
  if (replyButton) {
    return replyButton
  }
  return null;
}

function extractEmailText() {
  const emailBodyElement = document.querySelector('div.adn.ads div.gs div.a3s.aiL > div:nth-child(1) div');
  if (emailBodyElement) {
    const emailText = emailBodyElement.textContent;
    console.log(emailText);
    return emailText;
  }
}

function getIncomingMessageElement() {
  const emailBodyElement = document.querySelector('div.adn.ads div.gs');
  if (emailBodyElement) {
    return emailBodyElement;
  }
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.command === "ctrl+shift+y") {
      console.log("cmd");
      let message = getMessageBody();
      let popover2 = document.querySelector('.popover2');
      if (message && !popover2) {
        let popover2 = document.createElement('div');
        popover2.className = "popover2";

        let section1 = document.createElement('div');
        section1.className = 'section1';

        //let logo = document.createElement('img');
        //logo.src = chrome.runtime.getURL('images/icon.png');

        let writingField = document.createElement('div');
        writingField.className = 'writingField';
        writingField.textContent = 'Напиши мне ';
        writingField.contentEditable = 'true';

        writingField.addEventListener("keyup", (event) => {
          if (event.key === 'Enter') {
            console.log("sending your promt to gpt...");
              getResponseFromGPT(writingField.textContent).then(
                (response) => {
                  console.log(response);
                  response = response.content;
                  message.textContent += response;
                }
              );
          }
        });

        //section1.appendChild(logo);
        section1.appendChild(writingField);

        let section2 = document.createElement('div');
        section2.className = 'section2';

        let paragraph = document.createElement('p');
        paragraph.textContent = 'Или же ...';

        let ul = document.createElement('ul');

        let li1 = document.createElement('li');
        li1.textContent = 'Составь набросок письма ...';
        li1.addEventListener('click', () => {
          writingField.textContent = 'Составь набросок ';
        });

        let li2 = document.createElement('li');
        li2.textContent = 'Составь список из ...';
        li2.addEventListener('click', () => {
          writingField.textContent = 'Составь список из ';
        });

        let li3 = document.createElement('li');
        li3.textContent = 'Создай заголовок для ...';
        li3.addEventListener('click', () => {
          writingField.textContent = 'Создай заголовок для ';
        });

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);

        section2.appendChild(paragraph);
        section2.appendChild(ul);

        let bottom = document.createElement('div');
        bottom.className = 'bottom';
        bottom.innerHTML = "WritingBuddy";

        popover2.appendChild(section1);
        popover2.appendChild(section2);
        popover2.appendChild(bottom);

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const caretPositionRect = range.getBoundingClientRect();

          // Get the X and Y coordinates of the caret position
          const left = caretPositionRect.left;
          const top = caretPositionRect.bottom;

          popover2.style.top = top + `px`;
          popover2.style.left = left + `px`;
          popover2.style.zIndex = '999999';
        }

        document.body.appendChild(popover2);
      }
    }
  }
);

document.addEventListener('click', (event) => {
  let popoverCommand = document.querySelector('.popover2');
  //console.log(popover);
  if (popoverCommand) {
    const outsideClick = !popoverCommand.contains(event.target);
    if (outsideClick) {
      popoverCommand.remove();
    }
  }
});


chrome.runtime.sendMessage({ action: "get_current_tab" });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "reviewEmail") {
    console.log("here we go");
    const emailText = getEmail();
    if (emailText) {
      var targets = [];
      getRecommendationsFromGPT(emailText).then(
        (response) => {
          response = response.content;

          const responseSentences = response.split(".");
          const userSentences = emailText.split(".");
          //using that piece of shitcode just for a test, MUST rework later!!!
          if (responseSentences.length == userSentences.length) {
            for (let i = 0; i < userSentences.length; i++) {
              //console.log(response);
              if (!(responseSentences[i] === userSentences[i])) {
                let target = [userSentences[i], responseSentences[i]];
                targets.push(target);
              };
            };
          };

          console.log(targets);

          for (let x = 0; x < targets.length; x++) {
            console.log("here we are");
            let target = targets[x];
            const selector = "div[aria-label='Message Body'], div[aria-label='Message text'], div.editable";
            let textarea = document.querySelector(selector);
            usertext = textarea.innerHTML;
            console.log(usertext);
            const wrappedContent = usertext.replace(new RegExp(target[0], 'g'), `<span class="target-sentence-${x}">${target[0]}</span>`);
            textarea.innerHTML = wrappedContent;
          };

          for (let y = 0; y < targets.length; y++) {
            let target = targets[y];
            let className = `.target-sentence-` + y;
            let targetWordElement = document.querySelector(className);
            console.log(target[0]);
            console.log(targetWordElement);
            if (targetWordElement) {
              targetWordElement.style.textDecoration = "underline";
              targetWordElement.addEventListener('click', () => {
                console.log(`this word got clicked: ` + targetWordElement.textContent);

                const targetWordRect = targetWordElement.getBoundingClientRect();

                var left = targetWordRect.left;
                var top = targetWordRect.bottom + 5;

                popover = document.getElementById('div-sentence-' + y);

                if (popover) {
                  popover.style.visibility = 'visible';
                } else {
                  console.log('creating popover...');
                  //Here we create a popover div
                  popover = document.createElement('div');
                  popover.id = 'div-sentence-' + y;
                  popover.className = "popover";
                  popover.style.top = top + `px`;
                  popover.style.left = left + `px`;
                  popover.style.visibility = 'visible';
                  popover.style.zIndex = '999999';
                  popover.contentEditable = 'false';

                  popoverBody = document.createElement('div');
                  popoverBody.className = 'body';

                  div1 = document.createElement('div');
                  div1.className = 'prompt';
                  div1.textContent = 'Предлагаем переписать вот так:';

                  suggestion = document.createElement('div');
                  suggestion.className = 'suggestion';
                  suggestion.textContent = target[1];
                  suggestion.addEventListener('click', () => {
                    targetWordElement.textContent = target[1];
                  });

                  popoverBody.appendChild(div1);
                  popoverBody.appendChild(suggestion);

                  rejectButton = document.createElement('div');
                  rejectButton.className = 'reject';
                  rejectButton.textContent = '✖ Отклонить';
                  rejectButton.addEventListener('click', () => {
                    if (popover.style.visibility == 'visible') {
                      console.log("I am getting clicked!!!");
                      popover.style.visibility = 'hidden';
                    }
                  });

                  popoverBottom = document.createElement('div');
                  popoverBottom.className = "bottom";
                  popoverBottom.textContent = "©WritingBuddy";

                  document.body.appendChild(popover);

                  popover.appendChild(popoverBody);
                  popover.appendChild(rejectButton);
                  popover.appendChild(popoverBottom);
                }
              });
            };
          };

        }
      );
    }
  }
});

window.addEventListener('hashchange', () => {
  if (window.location.href.includes('#inbox/')) {
    console.log("ehere");
    const replyButton = getReplyButton();
    console.log(replyButton);
    //console.log(extractEmailText());
    const msg = getIncomingMessageElement();
    if (msg) {
      if (!document.querySelector('.replyDiv')) {
        console.log(msg);
        replyDiv = document.createElement('div');
        replyDiv.className = 'replyDiv'
        const replyYes = document.createElement('button');
        replyYes.innerHTML = 'Ответить Да';
  
        replyYes.addEventListener('click', () => {
          const replyButton = getReplyButton();
          replyButton.click();
          
          const emailText = extractEmailText();
          console.log(emailText);
          
          if (emailText) {
            const prompt = `Составь пример ответа на такое письмо. Ответь да: ` + emailText;
            console.log(prompt);
            getResponseFromGPT(prompt).then(
              (response) => {
                response = response.content;
                const replyBox = document.querySelector("div[aria-label='Message Body'], div[aria-label='Message text'], div.editable");
                console.log(replyBox);
                if (replyBox) {
                  replyBox.textContent = response;
                }
              }
            )
          }
        });
  
        const replyNo = document.createElement('button');
        replyNo.innerHTML = 'Ответить Нет';
        replyNo.addEventListener('click', () => {
          const replyButton = getReplyButton();
          replyButton.click();
          
          const emailText = extractEmailText();
          console.log(emailText);
          
          if (emailText) {
            const prompt = `Составь пример ответа на такое письмо. Ответь Нет: ` + emailText;
            console.log(prompt);
            getResponseFromGPT(prompt).then(
              (response) => {
                response = response.content;
                const replyBox = document.querySelector("div[aria-label='Message Body'], div[aria-label='Message text'], div.editable");
                console.log(replyBox);
                if (replyBox) {
                  replyBox.textContent = response;
                }
              }
            )
          }
        });
  
        const replyTY = document.createElement('button');
        replyTY.innerHTML = 'Ответить Спасибо';
        
        replyTY.addEventListener('click', () => {
          const replyButton = getReplyButton();
          replyButton.click();
          
          const emailText = extractEmailText();
          console.log(emailText);
          
          if (emailText) {
            const prompt = `Составь пример ответа на такое письмо. В ответе поблагодари отправителя: ` + emailText;
            console.log(prompt);
            getResponseFromGPT(prompt).then(
              (response) => {
                response = response.content;
                const replyBox = document.querySelector("div[aria-label='Message Body'], div[aria-label='Message text'], div.editable");
                console.log(replyBox);
                if (replyBox) {
                  replyBox.textContent = response;
                }
              }
            )
          }
        });
  
        replyDiv.appendChild(replyYes);
        replyDiv.appendChild(replyNo);
        replyDiv.appendChild(replyTY);
  
        msg.appendChild(replyDiv);
      }
    }
    const incomingMessage = document.querySelector("div.h7.bg.ie.nH.oy8Mbf div.gs");
    if (incomingMessage) {
      console.log(incomingMessage);
      replyDiv = document.createElement('div');
      
      const replyYes = document.createElement('button');
      replyYes.innerHTML = 'Ответить Да';
      replyYes.addEventListener('click', () => {
        const replyButton = getReplyButton();
        replyButton.click();
      });

      const replyNo = document.createElement('button');
      replyNo.innerHTML = 'Ответить Нет';

      const replyTY = document.createElement('button');
      replyTY.innerHTML = 'Ответить Спасибо';

      replyDiv.appendChild(replyYes);
      replyDiv.appendChild(replyNo);
      replyDiv.appendChild(replyTY);

      incomingMessage.appendChild(replyDiv);
    }
  }
});










// window.onload = function(){

//   window.addEventListener('hashchange', function () {
//     console.log(window.location.href);
//     if (window.location.href.includes('compose=new')) {
//       let messageBody = getMessageBody();
//       if (messageBody) {
//         console.log("message is open");

//         gmail = getMessageBody();
//         if (gmail) {
//           email = gmail.textContent;
//           let buffer

//           gmail.addEventListener("input", () => {

//             email = gmail.innerText;
//             if (email.includes('//')) {
//               console.log(gmail.innerHTML);
//               const wrappedContent = email.replace(new RegExp('//', 'g'), `<span class="target">//</span>`);
//               gmail.innerHTML = wrappedContent;
//               const doubleSlash = document.querySelector('.target');

//               if (doubleSlash) {
//                 doubleSlash.addEventListener('mouseover', () => {
//                   doubleSlash.style.backgroundColor = 'purple';
//                   doubleSlash.style.cursor = 'pointer';
//                 });

//                 doubleSlash.addEventListener('mouseout', () => {
//                   doubleSlash.style.backgroundColor = 'transparent';
//                 });

//                 doubleSlash.addEventListener("click", () => {

//                   let popover = document.createElement('div');
//                   popover.className = "popover";

//                   let section1 = document.createElement('div');
//                   section1.className = 'section1';

//                   //let logo = document.createElement('img');
//                   //logo.src = chrome.runtime.getURL('images/icon.png');

//                   let writingField = document.createElement('div');
//                   writingField.className = 'writingField';
//                   writingField.textContent = 'Напиши-ка мне...';
//                   writingField.contentEditable = 'true';

//                   //section1.appendChild(logo);
//                   section1.appendChild(writingField);

//                   let section2 = document.createElement('div');
//                   section2.className = 'section2';

//                   let paragraph = document.createElement('p');
//                   paragraph.textContent = 'Или же ...';

//                   let ul = document.createElement('ul');

//                   let li1 = document.createElement('li');
//                   li1.textContent = 'Составь набросок письма ...';
//                   let li2 = document.createElement('li');
//                   li2.textContent = 'Составь список из ...';
//                   let li3 = document.createElement('li');
//                   li3.textContent = 'Создай заголовок для ...';

//                   ul.appendChild(li1);
//                   ul.appendChild(li2);
//                   ul.appendChild(li3);

//                   section2.appendChild(paragraph);
//                   section2.appendChild(ul);

//                   let bottom = document.createElement('div');
//                   bottom.className = 'bottom';
//                   bottom.innerHTML = "WritingBuddy";

//                   popover.appendChild(section1);
//                   popover.appendChild(section2);
//                   popover.appendChild(bottom);

//                   const targetWordRect = doubleSlash.getBoundingClientRect();

//                   var left = targetWordRect.left;
//                   var top = targetWordRect.bottom + 5;

//                   popover.style.top = top + `px`;
//                   popover.style.left = left + `px`;
//                   popover.style.zIndex = '999999';

//                   document.body.appendChild(popover);

//                   console.log("// got clicked!");
//                 });


//                 //REMOVE THE POPUP WHEN USER CLICKS AT ANYTHING NOT RELATED TO THE POPUP
//                 document.addEventListener('click', (event) => {
//                   let popover = document.querySelector('.popover');
//                   //console.log(popover);
//                   if (popover) {
//                     const outsideClick = !popover.contains(event.target) && !doubleSlash.contains(event.target);
//                     if (outsideClick) {
//                       popover.remove();
//                     }
//                   }
//                 });
//               }
//             }
//           });
//         }
//       }
//     } else {
//       console.log('all compose windows are currently closed');
//     }
//   });



// };