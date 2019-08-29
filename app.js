let rootNode = document.getElementById("root");

const DESCRIBE_HEIGHT = 40;
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const HUNDRED = 100;
const MIN_NUMBER = 9;
const MAX_NUMBERS = 40000;
const MIN_HEIGHT = 10;
const MIN_WIDTH = 10;
let widthScreen = 800;
let heightScreen = 550;
const GAME_HEIGHT = heightScreen;
const GAME_WIDTH = widthScreen;
let game = createElem("div", rootNode, "", "game");
game.style.height = GAME_HEIGHT + TWO + "px";
game.style.width = GAME_WIDTH + TWO + "px";
game.style.border = "1px solid #A5A5A5";

let MAX_HEIGHT;
let MAX_WIDTH;

let createNewGameFild = () =>{
  const MAX_HEIGHT_NUMBER = GAME_HEIGHT / MIN_HEIGHT;
  const MAX_WIDTH_NUMBER = GAME_WIDTH / MIN_WIDTH;
  const MAX_NUMBER = MAX_HEIGHT_NUMBER * MAX_WIDTH_NUMBER;
  MAX_HEIGHT = ONE + Math.floor(Math.random() * (MAX_HEIGHT_NUMBER - ONE));
  MAX_WIDTH = ONE + Math.floor(Math.random() * (MAX_WIDTH_NUMBER - ONE));
  partHeight(game, MAX_HEIGHT_NUMBER, MAX_WIDTH_NUMBER);
  let insideGame = document.getElementsByClassName("insideGame");
  for (let i = 0; i < insideGame.length; i++) {
    insideGame[i].addEventListener("click", getColor);
  }
}

//------------------------functions-----------------------------

function createElem(strElem, parent, strText, strClass, arrAttribute) {
  let elem = document.createElement(strElem);
  if (strText) {
    elem.appendChild(document.createTextNode(strText));
  }
  if (strClass) {
    elem.className = strClass;
  }
  if (parent) {
    parent.appendChild(elem);
  }
  if (arrAttribute) {
    for (let i = 0; i < arrAttribute.length; i++) {
      elem.setAttribute(arrAttribute[i][ZERO], arrAttribute[i][ONE]);
    }
  }
  return elem;
}

function partWidth(parent, parentHeight, parentWidth) {
  let countWidth = 0;
  while (countWidth < parentWidth) {
    let width = ONE + Math.floor(Math.random() * (parentWidth - ONE)); //
    if (parentWidth - countWidth !== width) {
      if (parentWidth - countWidth - width < ZERO) {
        width = parentWidth - countWidth;
      }
    }
    countWidth += width;
    if (parentHeight > MAX_HEIGHT || width > MAX_WIDTH) {
      let inside = createElem("div", parent, "", "inside");
      inside.style.height = parentHeight * MIN_HEIGHT + "px";
      inside.style.width = width * MIN_WIDTH + "px";
      if (parentHeight > ONE) {
        partHeight(inside, parentHeight, width);
      } else if (width > ONE) {
        partWidth(inside, parentHeight, width);
      } else {
        return;
      }
    } else {
      let insideGame = createElem("div", parent, "", "insideGame");
      insideGame.style.height = parentHeight * MIN_HEIGHT + "px";
      insideGame.style.width = width * MIN_WIDTH + "px";
    }
  }
}

function partHeight(parent, parentHeight, parentWidth) {
  let countHeight = 0;
  while (countHeight < parentHeight) {
    let height = ONE + Math.floor(Math.random() * (parentHeight - ONE)); //
    if (parentHeight - countHeight !== height) {
      if (parentHeight - countHeight - height < ZERO) {
        height = parentHeight - countHeight;
      }
    }
    countHeight += height;
    if (height > MAX_HEIGHT || parentWidth > MAX_WIDTH) {
      let inside = createElem("div", parent, "", "inside");
      inside.style.height = height * MIN_HEIGHT + "px";
      inside.style.width = parentWidth * MIN_WIDTH + "px";
      if (parentWidth > ONE) {
        partWidth(inside, height, parentWidth);
      } else if (height > ONE) {
        partHeight(inside, height, parentWidth);
      } else {
        return;
      }
    } else {
      let insideGame = createElem("div", parent, "", "insideGame");
      insideGame.style.height = height * MIN_HEIGHT + "px";
      insideGame.style.width = parentWidth * MIN_WIDTH + "px";
    }
  }
}

function getColor(e) {
  e.target.style.backgroundColor = document.getElementById('background_color').value;
  this.style.borderColor = document.getElementById('border_color').value;
}

createNewGameFild();

let generateBtn = document.getElementsByClassName('generateNew')[0];
generateBtn.onclick = () => {
  for (var i = game.childNodes.length-1; i >= 0 ; i--) {
    game.childNodes[i].remove();
  }
  createNewGameFild();
}