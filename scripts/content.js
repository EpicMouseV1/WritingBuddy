var language = 'english';
var writingStyle = '';

function sendRequestToGpt(userInput) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8001/text/' + userInput, true);
  xhr.send();
  return xhr;
}

// async function getRecommendationsFromGPT(userInput) {
//   try {
//     const response = await fetch('http://localhost:8001/text/' + userInput);
//     const responseGPT = await response.json();
//     console.log(responseGPT);
//     return responseGPT;
//   } catch (error) {
//     console.error(error);
//   }
// }



async function getRecommendationsFromGPT(text, apiKey = '') {
  //console.log(text);
  if (language === 'russian') {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          {"role": "system", "content": `Ты ассистент который помогает пользователям лучше писать. Прочитай каждое предложение текста и исправь ошибки. не меняй структуру текста и количесво предложений. Стиль писмьма: ${writingStyle}`},
          {"role": "user", "content": `${text}`}],
        model: "gpt-3.5-turbo",
        n: 1,
        stop: null,
        temperature: 0.8
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      //console.log(data.choices[0].message.content);
      return (data.choices[0].message.content);
    } else {
      return ("amogus");
    }

  } else if (language === 'english') {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          {"role": "system", "content": `You are assistant who helps to write better. Read each sentence and fix errors. Do not change the structure of the text and the amount of sentences. The style should be ${writingStyle}`},
          {"role": "user", "content": `${text}`}],
        model: "gpt-3.5-turbo",
        n: 1,
        stop: null,
        temperature: 0.8
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      //console.log(data.choices[0].message.content);
      return (data.choices[0].message.content);
    } else {
      return ("amogus");
    }
  }
}


async function getResponseFromGPT(text, apiKey = '') {
  if (language === 'russian') {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          {"role": "system", "content": "Ты ассистент который отвечает на электронные письма. Вывод не должен содержать ничего кроме ответа на письмо. Ответ должен быть на том же языке, что и письмо."},
          {"role": "user", "content": `Письмо: ${text}`}
        ],
        model: "gpt-3.5-turbo",
        n: 1,
        stop: null,
        temperature: 1
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      //console.log(data.choices[0].message.content);
      return (data.choices[0].message.content);
    } else {
      return ("amogus");
    }

  } else if (language === 'english') {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
        messages: [
          {"role": "system", "content": "You are an assistant who writes replies to emails. The output should only contain the answer to the email."},
          {"role": "user", "content": `${text}`}
        ],
        model: "gpt-3.5-turbo",
        n: 1,
        stop: null,
        temperature: 1
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      //console.log(data.choices[0].message.content);
      return (data.choices[0].message.content);
    } else {
      return ("amogus");
    }
  }
}


async function constructEmailWithGPT(text, apiKey = '') {
  //console.log(language);
  if (language === 'russian') {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          {"role": "system", "content": "Ты ассистент который помогает генерировать электронные письмо по запросу пользователя."},
          {"role": "user", "content": `${text}`}
        ],
        model: "gpt-3.5-turbo",
        n: 1,
        stop: null,
        temperature: 1
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      //console.log(data.choices[0].message.content);
      return (data.choices[0].message.content);
    } else {
      return ("amogus");
    }
  } else if (language === 'english') {
    //console.log("here");
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: [
          {"role": "system", "content": "You are assistant who helps to write emails."},
          {"role": "user", "content": `${text}`}
        ],
        model: "gpt-3.5-turbo",
        n: 1,
        stop: null,
        temperature: 1
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      //console.log(data.choices[0].message.content);
      return (data.choices[0].message.content);
    } else {
      return ("amogus");
    }
  }

}

// async function getResponseFromGPT(userInput) {
//   try {
//     const response = await fetch('http://localhost:8001/text2/' + userInput);
//     const responseGPT = await response.json();
//     console.log(responseGPT);
//     return responseGPT;
//   } catch (error) {
//     console.error(error);
//   }
// }

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
  var emailBodyElement = document.querySelector('div.adn.ads div.gs div.a3s.aiL > div:nth-child(1) div');
  if (!emailBodyElement) {
    emailBodyElement = document.querySelector('div.adn.ads div.gs div.a3s.aiL');
  }
  if (emailBodyElement) {
    const emailText = emailBodyElement.textContent;
    //console.log(emailText);
    return emailText;
  }
}

function getIncomingMessageElement() {
  const emailBodyElement = document.querySelector('div.adn.ads div.gs');
  if (emailBodyElement) {
    return emailBodyElement;
  }
}


//set language
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.lang === 'russian') {
      language = 'russian';
    } else if (request.lang === 'english') {
      language = 'english';
    }
    //console.log(language);
  }
)


// command
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.command === "ctrl+shift+y") {
      //console.log("cmd");
      let message = getMessageBody();
      let popover2 = document.querySelector('.popover2');
      // console.log(message);
      // console.log(popover2);
      if (message && !popover2) {
        // console.log("creating popover...");
        let popover2 = document.createElement('div');
        popover2.className = "popover2";

        let section1 = document.createElement('div');
        section1.className = 'section1';

        //let logo = document.createElement('img');
        //logo.src = chrome.runtime.getURL('images/icon.png');

        let writingField = document.createElement('div');
        writingField.className = 'writingField';
        writingField.textContent = 'Compose me ';
        writingField.contentEditable = 'true';

        

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

        writingField.addEventListener("keyup", (event) => {
          if (event.key === 'Enter') {
            if (!document.querySelector(".loader")) {
              const loader = document.createElement('div');
              loader.className= 'loader';
              bottom.appendChild(loader);

              //console.log("sending your promt to gpt...");
              constructEmailWithGPT(writingField.textContent).then(
                (response) => {
                  //console.log(response);
                  //response = response.content;
                  message.textContent += response;
                  loader.remove();
                  popover2.remove();
                }
              );
            }
          }
        });

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const caretPositionRect = range.getBoundingClientRect();


          // Get the X and Y coordinates of the caret position
          var left = caretPositionRect.left;
          var top = caretPositionRect.bottom;

          // console.log(top);
          // console.log(left);

          // console.log(window.innerHeight);
          // console.log(window.innerWidth);

          if (top + 350 > window.innerHeight) {
            //console.log(top);
            top -= 350;
          }

          if (left + 150 > window.innerWidth) {
            //console.log(left);
            left -= 250;  
          }

          popover2.style.top = top + `px`;
          popover2.style.left = left + `px`;
          popover2.style.zIndex = '999999';

          if (left == 0) {
            let x = window.innerHeight/2-100;
            let y = window.innerWidth/2;
            //console.log(x, y);
            popover2.style.top = x+`px`;
            popover2.style.left = y+`px`;
            popover2.style.zIndex = '999999';
          }

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //console.log(request.style);
  if (request.style) {
    writingStyle = request.style;
    if (language === 'russian') {
      switch (writingStyle) {
        case 'friendly':
          writingStyle = 'дружелюный'
          break;
        case 'business':
          writingStyle = 'Деловой'
          break;
        case 'serious':
          writingStyle = 'Серьезный'
          break;
        case 'casual':
          writingStyle = 'Свободный'
          break;
        case 'lighthearted':
          writingStyle = 'Доброжелательный'
          break;
      }
    }
  }

  if (request.action === "reviewEmail") {
    //console.log("here we go");
    const emailText = getEmail();
    if (emailText) {
      var targets = [];
      getRecommendationsFromGPT(emailText).then(
        (response) => {
          //response = response.content;

          const responseSentences = response.split(".");
          const userSentences = emailText.split(".");
          //using that piece of a shitcode just for a test, MUST rework later!!!
          if (responseSentences.length == userSentences.length) {
            for (let i = 0; i < userSentences.length; i++) {
              //console.log(response);
              if (!(responseSentences[i] === userSentences[i])) {
                let target = [userSentences[i], responseSentences[i]];
                targets.push(target);
              };
            };
          };

          //console.log(targets);

          for (let x = 0; x < targets.length; x++) {
            //console.log("here we are");
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
            //console.log(target[0]);
            console.log(targetWordElement);

            if (targetWordElement) {
              targetWordElement.style.textDecoration = "underline";
              targetWordElement.style.backgroundColor = "rgb(181, 147, 148)";
              targetWordElement.style.cursor = "pointer";

              function targetWordElementClick() {

                //console.log("jaja");
                //console.log(`this word got clicked: ` + targetWordElement.textContent);

                const targetWordRect = targetWordElement.getBoundingClientRect();

                var left = targetWordRect.left;
                var top = targetWordRect.bottom + 5;

                popover = document.getElementById('div-sentence-' + y);

                if (popover) {
                  popover.style.visibility = 'visible';
                } else {
                  //console.log('creating popover...');
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
                    targetWordElement.style.textDecoration = "none";
                    targetWordElement.style.backgroundColor = "transparent";
                    targetWordElement.removeEventListener("click", targetWordElementClick);
                    popover.remove();
                  });

                  popoverBody.appendChild(div1);
                  popoverBody.appendChild(suggestion);

                  rejectButton = document.createElement('div');
                  rejectButton.className = 'reject';
                  rejectButton.textContent = '✖ Отклонить';
                  rejectButton.addEventListener('click', () => {
                    if (popover.style.visibility == 'visible') {
                      //console.log("I am getting clicked!!!");
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
              }

              targetWordElement.addEventListener('click', targetWordElementClick);
            };
          };

        }
      );
    }
    // chrome.runtime.sendMessage({ action: "check_completed" });
  }
});

window.addEventListener('hashchange', () => {

  if (window.location.href.includes('compose=new')) {
      document.querySelectorAll("div[aria-label='Message Body'], div[aria-label='Message text'], div.editable").forEach((compose) => {
        compose.innerHTML = 'CTRL-SHFT+Y to call a command window';
      }
    );
    const selector = ".bAK";
    const compose_bottom_row = document.querySelector(selector);
    const more_opt_btn = document.querySelector(".a8X gU");
    if (compose_bottom_row) {
      console.log("here");
      console.log(compose_bottom_row)
      const check_me = document.createElement('div');
      check_me.innerText = "ඞ";
      check_me.style.cursor = "pointer";
      //check_me.style.position = "relative";

      check_me.addEventListener("click", () => {
        const rect = check_me.getBoundingClientRect();
        const x = rect.left
        const y = rect.top;
        console.log(x, y)

        const check_me_form = document.createElement('div');
        check_me_form.innerText = "WritingBuddy";
        check_me_form.style.position = "absolute";
        check_me_form.style.top = (y-15)+`px`;
        check_me_form.style.left = x+`px`;
        check_me_form.style.zIndex = '999999';

        document.body.appendChild(check_me_form);
        console.log(check_me_form);
      });

      compose_bottom_row.appendChild(check_me);
    }
  }

  if (window.location.href.includes('#inbox/')) {
    //console.log("ehere");
    const replyButton = getReplyButton();
    //console.log(replyButton);
    //console.log(extractEmailText());
    const msg = getIncomingMessageElement();
    if (msg) {
      if (!document.querySelector('.replyDiv')) {
        //console.log(msg);
        replyDiv = document.createElement('div');
        replyDiv.className = 'replyDiv'
        const replyYes = document.createElement('button');
        replyYes.innerHTML = 'Ответить Да';
  
        replyYes.addEventListener('click', () => {
          const replyButton = getReplyButton();
          if (replyButton) {
            replyButton.click();
          }
          
          const emailText = extractEmailText();
          
          if (!document.querySelector('.loader')) {
            const loader = document.createElement('div');
            loader.className = 'loader';
            replyYes.appendChild(loader);
          }

          
          if (emailText) {
           // console.log(emailText);
            var prompt = '';
            if (language === 'russian') {
              prompt = `Составь пример положительного ответа на такое письмо: ` + emailText;
            } else {
              prompt = `The answer to the email should be confirmative: ` + emailText;
            }
            //console.log(prompt);
            getResponseFromGPT(prompt).then(
              (response) => {
                //response = response.content;
                const replyBox = document.querySelector("div[aria-label='Message Body'], div[aria-label='Message text'], div.editable");
                //console.log(replyBox);
                if (replyBox) {
                  replyBox.textContent = response;
                  const loader = document.querySelector('.loader');
                  loader.remove();
                }
              }
            )
          } else {
            if (!document.querySelector('.error')) {
              const error = document.createElement('div');
              error.innerHTML = 'We could not create a response, sorry ;(';
              error.className = 'error';
              replyYes.appendChild(error);
            }
          }
        });
  
        const replyNo = document.createElement('button');
        replyNo.innerHTML = 'Ответить Нет';
        replyNo.addEventListener('click', () => {
          const replyButton = getReplyButton();
          if (replyButton) {
            replyButton.click();
          }
          
          const emailText = extractEmailText();

          if (!document.querySelector('.loader')) {
            const loader = document.createElement('div');
            loader.className = 'loader';
            replyNo.appendChild(loader);
          }
          
          if (emailText) {
            var prompt = '';
            if (language === 'russian') {
              prompt = `Составь пример негативного ответа на такое письмо: ` + emailText;
            } else {
              prompt = `The answer to the email should be negative: ` + emailText;
            }

            //console.log(prompt);
            getResponseFromGPT(prompt).then(
              (response) => {
                //response = response.content;
                const replyBox = document.querySelector("div[aria-label='Message Body'], div[aria-label='Message text'], div.editable");
                //console.log(replyBox);
                if (replyBox) {
                  replyBox.textContent = response;
                  const loader = document.querySelector('.loader');
                  loader.remove();
                }
              }
            )
          } else {
            if (!document.querySelector('.error')) {
              const error = document.createElement('div');
              error.innerHTML = 'We could not create a response, sorry ;(';
              error.className = 'error';
              replyNo.appendChild(error);
            }
          }
        });
  
        const replyTY = document.createElement('button');
        replyTY.innerHTML = 'Ответить Спасибо';
        
        replyTY.addEventListener('click', () => {
          const replyButton = getReplyButton();
          if (replyButton) {
            replyButton.click();
          }
          
          const emailText = extractEmailText();
          //console.log(emailText);

          if (!document.querySelector('.loader')) {
            const loader = document.createElement('div');
            loader.className = 'loader';
            replyTY.appendChild(loader);
          }
          
          if (emailText) {
            var prompt = '';
            if (language === 'russian') {
              prompt = `Составь ответа на такое письмо. В ответе поблагодари отправителя: ` + emailText;
            } else {
              prompt = `The answer to the email should be negative: ` + emailText;
            }

            //console.log(prompt);
            getResponseFromGPT(prompt).then(
              (response) => {
                //response = response.content;
                const replyBox = document.querySelector("div[aria-label='Message Body'], div[aria-label='Message text'], div.editable");
                //console.log(replyBox);
                if (replyBox) {
                  replyBox.textContent = response;
                  const loader = document.querySelector('.loader');
                  loader.remove();
                }
              }
            )
          } else {
            if (!document.querySelector('.error')) {
              const error = document.createElement('div');
              error.innerHTML = 'We could not create a response, sorry ;(';
              error.className = 'error';
              replyTY.appendChild(error);
            }
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
      //console.log(incomingMessage);
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