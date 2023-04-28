// create elements and add them in DOM
const createElem = (elem, elemClass, elemText = "") => {
  const element = document.createElement(elem);
  element.className = elemClass;
  element.innerText = elemText;
  return element;
};

const wrapper = createElem("div", "wrapper");
const h1 = createElem("h1", "title", "RSS Виртуальная клавиатура");
const textarea = createElem("textarea", "textarea");
const keyboard = createElem("div", "keyboard");
const text1 = createElem("p", "text", "OS: Windows");
const text2 = createElem("p", "text", "Press Alt+Shift to change language");

document.body.append(wrapper);
wrapper.append(h1, textarea, keyboard, text1, text2);

const buttonMaker =  (key, place, ownClass) => {
  const button = createElem("div", "key", key);
  button.classList.add(ownClass);
  place.append(button);
};

const layout = {
  en: [ 
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BackSpace"],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
    ["Capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲", "Shift"],
    ["Ctrl", "ENG", "Alt", "  ", "Alt", "◄", "▼", "►", "Ctrl"],
  ],
  ru:  [
    ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BackSpace"],
    ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del"],
    ["Capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
    ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "▲", "Shift"],
    ["Ctrl", "РУС", "Alt", "  ", "Alt", "◄", "▼", "►", "Ctrl"],
  ],
};

const ownClasses = [
  ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
  ["Tab", "KeyQ",  "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",  "BracketLeft", "BracketRight", "Backslash", "Delete"],
  ["CapsLock",  "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
  ["ShiftLeft",  "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
  ["ControlLeft", "lang", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"],
];
let lg = localStorage.getItem("lang") ?? "en";

for (let i = 0; i < 5; i++) {
  let row = createElem("div", "row");
  keyboard.append(row);
  for(let j= 0; j < layout[lg][i].length; j++) {
    buttonMaker(layout[lg][i][j], row, ownClasses[i][j]);
  }
}

// highlights on keydown
const toggleActive = (e) => {
  const elem =  document.querySelector(`.${e.code}`);
  if(!elem) return;
  elem.classList.toggle("active");
};

document.addEventListener("keydown", (event) => toggleActive(event));
document.addEventListener("keyup", (event) => toggleActive(event));


// actions for keys
const notPrintable = ["Backspace", "Tab", "Delete", "CapsLock", "Enter", "ShiftLeft", "ShiftRight", "ControlLeft", "AltLeft", "lang", "AltRight", "ControlRight", "ArrowLeft", "ArrowRight"];

const shouldPrint = (elem) => !notPrintable.find(el => elem.classList.contains(el));

const typeElem = (elem) => { 
  if(!elem.classList.contains("key")) return;
  
  if(!textarea.onfocus) {
    textarea.focus();
  }

  let pos = textarea.selectionStart;
  let posEnd = textarea.selectionEnd;

  // print letters, digits, space and symbols
  if(shouldPrint(elem)) {
    textarea.textContent = textarea.textContent.slice(0, pos) + elem.textContent + textarea.textContent.slice(pos);
    textarea.selectionStart = ++pos;
  }
  // backspace
  if(elem.classList.contains("Backspace")) {
    if(pos === posEnd) {
      textarea.textContent = textarea.textContent.slice(0, pos-1) + textarea.textContent.slice(posEnd);
      textarea.selectionStart = --pos;
    } else {
      textarea.textContent = textarea.textContent.slice(0, pos) + textarea.textContent.slice(posEnd);
      textarea.selectionStart = pos;
    }
  }
  // delete
  if(elem.classList.contains("Delete")) { 
    if(pos === posEnd) {
      textarea.textContent = textarea.textContent.slice(0, pos) + textarea.textContent.slice(posEnd + 1);
      textarea.selectionStart = posEnd;
    } else {
      textarea.textContent = textarea.textContent.slice(0, pos) + textarea.textContent.slice(posEnd);
      textarea.selectionStart = pos;
    }
  }
  // Tab
  if(elem.classList.contains("Tab")) {
    textarea.textContent = textarea.textContent.slice(0, pos) + "    " + textarea.textContent.slice(pos);
    textarea.selectionStart = pos + 4;
  }
  // Arrows
  if(elem.classList.contains("ArrowRight")) {
    textarea.selectionEnd++;
    textarea.selectionStart = ++pos;
  } 
  if(elem.classList.contains("ArrowLeft")) {
    textarea.selectionStart--;
    textarea.selectionEnd = --posEnd;
  }
   // Enter
  if(elem.classList.contains("Enter")) {
    textarea.textContent = textarea.textContent.slice(0, pos) + "\n" + textarea.textContent.slice(pos);
    textarea.selectionStart = ++pos;
  }
};
// type from virtual keyboard
keyboard.addEventListener("click", (event) => typeElem(event.target));
// type from real keyboard
document.addEventListener("keydown", (event) => typeElem(document.querySelector(`.${event.code}`)));
document.addEventListener("keydown", (event) => event.preventDefault());

// Shift + Arrows - сделать на вирт клавиши, плюс пофиксить баги - на левой стрелке при первом нажатии не делает выделения
function selectText(event) {
  if(event.shiftKey && event.key == "ArrowRight") {
    textarea.selectionStart = textarea.selectionStart-1;
  }
  if(event.shiftKey && event.key == "ArrowLeft") {
    ++textarea.selectionEnd;
  }
}
document.addEventListener("keydown", (e) => selectText(e) );

// focus on textarea
keyboard.onmousedown = (e) => {
  if(document.activeElement === textarea) {
    e.preventDefault();
  }
 };

const buttons = document.querySelectorAll(".key"); // 

// Caps Lock
const caps = document.querySelector(".CapsLock");
let isCapsOn = localStorage.getItem("caps") ?? false;

const changeLetterCase = () => {
  buttons.forEach(el => { 
    if(shouldPrint(el)) {
      el.textContent = isCapsOn ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
  } });
};

const toggleCaps = () => {
  isCapsOn = !isCapsOn;
  changeLetterCase();
  caps.classList.toggle("on");
  localStorage.setItem("caps", isCapsOn);
};

document.addEventListener("DOMContentLoaded", () => {
  if(isCapsOn) {
    changeLetterCase();
    caps.classList.add("on");
  }
} );
caps.addEventListener("click", toggleCaps);
document.addEventListener("keydown", (event) => {
  if(event.code === "CapsLock") {
    toggleCaps(); 
  }
});

// change language
document.addEventListener("keydown", (event) => {
  if(event.altKey && event.shiftKey) {
    lg = lg === "ru" ? "en" : "ru";
    for (let i = 0; i < 5; i++) {
      let row = document.querySelectorAll(".row")[i];
      for(let j = 0; j < layout[lg][i].length; j++) {
        row.children[j].textContent = layout[lg][i][j];
      }
    }
    if(isCapsOn) {
      changeLetterCase();
    }
    localStorage.setItem("lang", lg);
  } 
});