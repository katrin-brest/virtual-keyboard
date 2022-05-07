const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.append(wrapper)

const h1 = document.createElement('h1');
h1.className = 'title';
h1.innerHTML = 'RSS Виртуальная клавиатура'
wrapper.append(h1)

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
wrapper.append(textarea)

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
wrapper.append(keyboard);

for(let i = 0; i <5; i++) {
let row = document.createElement('div');
row.className = 'row';
keyboard.append(row)
}

const rows = document.querySelectorAll('.row');

function buttonMaker (key, place, ownClass) {
    const button = document.createElement('div');
    button.className = 'key';
    button.classList.add(ownClass);
    button.innerText = key;
    place.append(button);
}

const row0 = ['\`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BackSpace'];
const row1 = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'];
const row2 = ['Capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'];
const row3 = ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'];
const row4 = ['Ctrl', 'Win', 'Alt', '  ', 'Alt', '◄', '▼', '►', 'Ctrl'];

const rowList = [row0, row1, row2, row3, row4]

const ownClass0 = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'];
const ownClass1 = ['Tab', 'KeyQ',  'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',  'BracketLeft', 'BracketRight', 'Backslash', 'Delete'];
const ownClass2 = ['CapsLock',  'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'];
const ownClass3 = ['ShiftLeft',  'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'];
const ownClass4 = ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];


const ownClasses = [ownClass0, ownClass1, ownClass2, ownClass3, ownClass4]

for (let i = 0; i < 5; i++) {
    for(let j= 0; j < rowList[i].length; j++) {
        buttonMaker(rowList[i][j], rows[i], ownClasses[i][j])
    }
}

document.addEventListener('keydown', function(event) {
   let elem =  document.querySelector(`.${event.code}`);
   if(elem === null) {
       return 
   } else {
       elem.classList.add('active');
   textarea.textContent += event.key;
   }
   if(elem.innerText == 'CapsLock') {
    letters.forEach(el => {
        if(el.innerText == el.innerText.toLowerCase()) {
            el.innerText = el.innerText.toUpperCase();
        } else {
            el.innerText = el.innerText.toLowerCase()
        }
    })
   }
  });

  keyboard.addEventListener('click', function(event) {
    let elem =  event.target;
    if(elem === null) {
        return 
    } else {
        textarea.textContent += elem.innerText;
    }
   });
 

// проверить работу функциональных клавиш - работают только на английской раскладке!!
document.addEventListener('keyup', function(event) {
   let elem =  document.querySelector(`.${event.code}`);
   if(elem === null) {
    return 
} else {
   elem.classList.remove('active')
  }});
 

//   делаем капс

const buttons = document.querySelectorAll('.key');

for(let but of buttons) {
    if (but.className.includes('Key')) {
        but.classList.add('letter')
    }
}
const letters = document.querySelectorAll('.letter');
const caps = document.querySelector('.CapsLock');

caps.addEventListener('click', () => {
         letters.forEach(el => {
            if(el.innerText == el.innerText.toLowerCase()) {
                el.innerText = el.innerText.toUpperCase();
            } else {
                el.innerText = el.innerText.toLowerCase()
            }
        })
    })

    document.addEventListener('keydown', function(event) {
        if(event.code == 'CapsLock') {
            console.log(event.key)
            letters.forEach(el => {
           if(el.innerText == el.innerText.toLowerCase()) {
               el.innerText = el.innerText.toUpperCase();
           } else {
               el.innerText = el.innerText.toLowerCase()
           }
       })
        }
        
   })
