const wrapper = document.createElement("div");
wrapper.className = "wrapper";
document.body.append(wrapper);

const h1 = document.createElement("h1");
h1.className = "title";
h1.innerHTML = "RSS Виртуальная клавиатура";
wrapper.append(h1);

const textarea = document.createElement("textarea");
textarea.className = "textarea";
wrapper.append(textarea);

const keyboard = document.createElement("div");
keyboard.className = "keyboard";
wrapper.append(keyboard);

const text1 = document.createElement("p");
text1.innerText = "OS: Windows";
text1.className = "text";
wrapper.append(text1);

const text2 = document.createElement("p");
text2.innerText = "Press Alt+Shift to change English to Russian";
text2.className = "text";
wrapper.append(text2);

for(let i = 0; i <5; i++) {
let row = document.createElement("div");
row.className = "row";
keyboard.append(row);
}

const rows = document.querySelectorAll(".row");

function buttonMaker (key, place, ownClass) {
    const button = document.createElement("div");
    button.className = "key";
    button.classList.add(ownClass);
    button.innerText = key;
    place.append(button);
}

const row0 = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BackSpace"];
const row1 = ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"];
const row2 = ["Capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"];
const row3 = ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲", "Shift"];
const row4 = ["Ctrl", "ENG ", "Alt", " ", "Alt", "◄", "▼", "►", "Ctrl"];

const rowList = [row0, row1, row2, row3, row4];

const ownClass0 = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"];
const ownClass1 = ["Tab", "KeyQ",  "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",  "BracketLeft", "BracketRight", "Backslash", "Delete"];
const ownClass2 = ["CapsLock",  "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"];
const ownClass3 = ["ShiftLeft",  "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"];
const ownClass4 = ["ControlLeft", "lang", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"];


const ownClasses = [ownClass0, ownClass1, ownClass2, ownClass3, ownClass4];

for (let i = 0; i < 5; i++) {
    for(let j= 0; j < rowList[i].length; j++) {
        buttonMaker(rowList[i][j], rows[i], ownClasses[i][j]);
    }
}
// подсветка клавиш
document.addEventListener("keydown", (event) => {
   const elem =  document.querySelector(`.${event.code}`);
      if(elem === null) {
       return;
   } else {
       elem.classList.add("active");
       }});

document.addEventListener("keyup", (event) => {
    let elem =  document.querySelector(`.${event.code}`);
    if(elem === null) {
     return ;
 } else {
    elem.classList.remove("active");
   }});


// Выносим действия с клавишами в отдельную функцию

function inputText(elem) {

    if(!textarea.onfocus) {
        textarea.focus();
    }
    let pos = textarea.selectionStart;
    let posEnd = textarea.selectionEnd;
    
    if(elem === null) {
        return ;
    } else {
        //   печатаем буквы, цифры и символы
        if(elem.classList.contains("letter") || elem.classList.contains("digit")|| elem.classList.contains("Equal") || elem.classList.contains("Minus")|| elem.classList.contains('Backquote') || elem.classList.contains("BracketRight") || elem.classList.contains("BracketLeft") ||elem.classList.contains("Backslash") || elem.classList.contains("Semicolon") || elem.classList.contains("Comma")|| elem.classList.contains("Period")||elem.classList.contains("Slash") || elem.classList.contains("Quote") ) {
           
            if(pos == 0) {
            textarea.textContent += elem.innerText;
            } else {
            textarea.textContent = textarea.textContent.slice(0, pos) + elem.innerText + textarea.textContent.slice(pos);
            }
            textarea.selectionStart = pos+1;
        }
        // пробел
        if(elem.classList.contains("Space")){
            textarea.textContent = textarea.textContent.slice(0, pos) + " " + textarea.textContent.slice(pos);
            textarea.selectionStart = pos+1;  
        }    
        // удалить назад, в т. ч. диапазон
        if(elem.classList.contains('Backspace')) {
            if(pos === posEnd) {
                textarea.textContent = textarea.textContent.slice(0, pos-1) + textarea.textContent.slice(posEnd);
                textarea.selectionStart = pos-1;
            } else {
                textarea.textContent = textarea.textContent.slice(0, pos) + textarea.textContent.slice(posEnd);
                textarea.selectionStart = pos;
            }
        }
        
        // удаляем вперед, в т.ч. диапазон
        if(elem.classList.contains('Delete')) { 
            if(pos === posEnd) {
                textarea.textContent = textarea.textContent.slice(0, pos) + textarea.textContent.slice(posEnd + 1);
                textarea.selectionStart = posEnd;
            } else {
                textarea.textContent = textarea.textContent.slice(0, pos) + textarea.textContent.slice(posEnd);
                textarea.selectionStart = pos;
            }
        }
        // делаем Таб
        if(elem.classList.contains('Tab')) {
           textarea.textContent = textarea.textContent.slice(0, pos) + "        " + textarea.textContent.slice(pos);
           textarea.selectionStart = pos + 8;
        }

        // делаем стрелки
        if(elem.classList.contains('ArrowRight')) {
            textarea.selectionStart++;
            textarea.selectionEnd = textarea.selectionStart;
        }
        if(elem.classList.contains('ArrowLeft')) {
            textarea.selectionStart--;
            textarea.selectionEnd = textarea.selectionStart;
        }
        if(elem.classList.contains('ArrowDown')) {
            textarea.textContent = textarea.textContent.slice(0, pos) + "не хочу вниз🠗" + textarea.textContent.slice(pos);
            textarea.selectionStart = pos + 14;
        }
        if(elem.classList.contains('ArrowUp')) {
            textarea.textContent = textarea.textContent.slice(0, pos) + "не хочу вверх🠕" + textarea.textContent.slice(pos);
            textarea.selectionStart = pos + 15;
        }

        // делаем Enter
        if(elem.classList.contains('Enter')) {
            textarea.textContent = textarea.textContent.slice(0, pos) + "\n" + textarea.textContent.slice(pos);
            textarea.selectionStart= pos+1;
          }


    }}


// печатаем в текстареа с виртуальной клавиатуры = глючит печать с вирт клавиатуры!!! - проверить
keyboard.addEventListener('click', (event) => inputText(event.target));

// печать с реальной клавиатуры
document.addEventListener('keydown', (event) => inputText(document.querySelector(`.${event.code}`)));
document.addEventListener('keydown', (event) => event.preventDefault());


//  делаем, чтобы текстареа не теряла фокус при кликам по виртулаьной клавиатуре
 keyboard.onmousedown = (e) => {
    if(document.activeElement === textarea) {
        e.preventDefault();
    }
 }

//   делаем капс
const buttons = document.querySelectorAll(".key");

for(let but of buttons) {
    if (but.className.includes("Key")) {
        but.classList.add("letter");
    } else if (but.className.includes("Digit")) {
        but.classList.add("digit");
    }
 }

const letters = document.querySelectorAll(".letter");
const symbols= [buttons[0], buttons[25], buttons[26], buttons [39], buttons[40], buttons[50], buttons[51]];

const caps = document.querySelector(".CapsLock");

caps.addEventListener("click", () => {

         letters.forEach(el => {
            if(el.innerText == el.innerText.toLowerCase()) {
                el.innerText = el.innerText.toUpperCase();
                 } else {
                el.innerText = el.innerText.toLowerCase();
            }
        });
        symbols.forEach(el => {
            if(el.innerText == el.innerText.toLowerCase()) {
                  el.innerText = el.innerText.toUpperCase();
             } else {
             el.innerText = el.innerText.toLowerCase();
             }})

        caps.classList.toggle('on');
    });

document.addEventListener("keydown", (event) => {
        if(event.code == "CapsLock") {

            console.log(event.key);

            letters.forEach(el => {
                if(el.innerText == el.innerText.toLowerCase()) {
                    el.innerText = el.innerText.toUpperCase();
                   } else {
                  el.innerText = el.innerText.toLowerCase();
                      }});

       symbols.forEach(el => {
           if(el.innerText == el.innerText.toLowerCase()) {
                 el.innerText = el.innerText.toUpperCase();
            } else {
            el.innerText = el.innerText.toLowerCase();
            }})
            caps.classList.toggle('on');    
     } });

    //  смена языков
const rusLetters = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "я", "ч", "с", "м","и", "т", "ь"];
const engLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']; 

const rusSymbols = ['ё', 'х', 'ъ', 'ж', 'э','б', 'ю'];
const engSymbols = ['`', '[', ']', ';', '\'',',', '.'];


const lang = document.querySelector(".lang");
lang.classList.add ('en');
document.addEventListener("keydown", (event) => {
if(event.altKey && event.shiftKey && lang.classList.contains('en')) {
       for(let i=0; i < letters.length; i++) {
            if(caps.classList.contains('on')) {
                letters[i].innerText = rusLetters[i].toUpperCase();
           } else {
            letters[i].innerText = rusLetters[i];
           }           
       }

       for(let i=0; i < symbols.length; i++) {
        if(caps.classList.contains('on')) {
            symbols[i].innerText = rusSymbols[i].toUpperCase(); 
    } else {
        symbols[i].innerText = rusSymbols[i]; 
    }}        
    
       lang.textContent = 'RUS'
       lang.classList.remove('en');
       lang.classList.add('rus');
    } else if(event.altKey && event.shiftKey && lang.classList.contains('rus')) {
        for(let i=0; i < letters.length; i++) {
            if(caps.classList.contains('on')) {
                letters[i].innerText = engLetters[i].toUpperCase();
            } else {
                letters[i].innerText = engLetters[i]; 
            }                     
        }
        for(let i=0; i < symbols.length; i++) {
            symbols[i].innerText = engSymbols[i]; 
        }
        lang.textContent = "ENG";
        lang.classList.remove('ru');
        lang.classList.add('en');
        }
});


