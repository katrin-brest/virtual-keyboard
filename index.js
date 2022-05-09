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
const row4 = ["Ctrl", "Win", "Alt", " ", "Alt", "◄", "▼", "►", "Ctrl"];

const rowList = [row0, row1, row2, row3, row4];

const ownClass0 = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"];
const ownClass1 = ["Tab", "KeyQ",  "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",  "BracketLeft", "BracketRight", "Backslash", "Delete"];
const ownClass2 = ["CapsLock",  "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"];
const ownClass3 = ["ShiftLeft",  "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"];
const ownClass4 = ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"];


const ownClasses = [ownClass0, ownClass1, ownClass2, ownClass3, ownClass4];

for (let i = 0; i < 5; i++) {
    for(let j= 0; j < rowList[i].length; j++) {
        buttonMaker(rowList[i][j], rows[i], ownClasses[i][j]);
    }
}

document.addEventListener("keydown", (event) => {
   let elem =  document.querySelector(`.${event.code}`);
      if(elem === null) {
       return;
   } else {
       elem.classList.add("active");
       if(elem.classList.contains("letter") || elem.classList.contains("digit") || elem.classList.contains("Backquote") || elem.classList.contains("Equal") || elem.classList.contains("Minus") || elem.classList.contains("Minus") || elem.classList.contains("Bracket") || elem.classList.contains("Backslash") || elem.classList.contains("Semicolon") || elem.classList.contains("Comma")|| elem.classList.contains("Period")||elem.classList.contains("Slash")|| elem.classList.contains("Quote")) {
           textarea.textContent += event.key;
   }
   
   }});
    

  keyboard.addEventListener("click", (event) => {
    let elem =  event.target;
    if(elem === null) {
        return ;
    } else {
        if(elem.classList.contains("letter") || elem.classList.contains("digit")|| elem.classList.contains("Backquote") || elem.classList.contains("Equal") || elem.classList.contains("Minus") || elem.classList.contains("Minus") || elem.classList.contains("BracketRight") || elem.classList.contains("BracketLeft") ||elem.classList.contains("Backslash") || elem.classList.contains("Semicolon") || elem.classList.contains("Comma")|| elem.classList.contains("Period")||elem.classList.contains("Slash") || elem.classList.contains("Quote") ) {
           console.log(elem);
           console.log(elem.innerText);
            textarea.textContent += elem.innerText;
        }
        if(elem.classList.contains("Space")){
            textarea.textContent += " ";
        }
    }
 } );
// добавить работу функциональных клавиш - работает только капс!!
document.addEventListener("keyup", (event) => {
   let elem =  document.querySelector(`.${event.code}`);
   if(elem === null) {
    return ;
} else {
   elem.classList.remove("active");
  }});
 
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
const caps = document.querySelector(".CapsLock");

caps.addEventListener("click", () => {
         letters.forEach(el => {
            if(el.innerText == el.innerText.toLowerCase()) {
                el.innerText = el.innerText.toUpperCase();
            } else {
                el.innerText = el.innerText.toLowerCase();
            }
        });
    });

document.addEventListener("keydown", (event) => {
        if(event.code == "CapsLock") {
            console.log(event.key);
            letters.forEach(el => {
           if(el.innerText == el.innerText.toLowerCase()) {
               el.innerText = el.innerText.toUpperCase();
               buttons[25].innerText= buttons[25].innerText.toUpperCase();
               buttons[26].innerText= buttons[26].innerText.toUpperCase();
               buttons[0].innerText= buttons[0].innerText.toUpperCase();
               buttons[39].innerText= buttons[39].innerText.toUpperCase();
               buttons[40].innerText= buttons[40].innerText.toUpperCase();
               buttons[50].innerText= buttons[50].innerText.toUpperCase();
               buttons[51].innerText= buttons[51].innerText.toUpperCase();
           } else {
               el.innerText = el.innerText.toLowerCase();
               buttons[25].innerText= buttons[25].innerText.toLowerCase();
               buttons[26].innerText= buttons[26].innerText.toLowerCase();
               buttons[0].innerText= buttons[0].innerText.toLowerCase();
               buttons[39].innerText= buttons[39].innerText.toLowerCase();
               buttons[40].innerText= buttons[40].innerText.toLowerCase();
               buttons[50].innerText= buttons[50].innerText.toLowerCase();
               buttons[51].innerText= buttons[51].innerText.toLowerCase();
           }
       });
     } });

    //  смена языков
const rusLetters = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "я", "ч", "с", "м","и", "т", "ь"];

document.addEventListener("keydown", (event) => {
if(event.altKey && event.shiftKey && buttons[0].textContent == "`") {
       for(let i=0; i < letters.length; i++) {
           letters[i].innerText = rusLetters[i]; 
       }
       buttons[25].innerText = "х";
       buttons[26].innerText = "ъ";
       buttons[0].innerText = "ё";
       buttons[39].innerText = "ж";
       buttons[40].innerText = "э";
       buttons[50].innerText = "б";
       buttons[51].innerText = "ю";
    }});
// добавить смену на английский алфавит обратно
