const cardsArray = [
  {
    name: "dino",
    img: "https://pngimg.com/uploads/mario/mario_PNG107.png",
  },
  {
    name: "ferret",
    img: "https://pngimg.com/uploads/mario/mario_PNG119.png",
  },
  {
    name: "bobomb",
    img: "https://pngimg.com/uploads/mario/mario_PNG128.png",
  },
  {
    name: "turtle",
    img: "https://pngimg.com/uploads/mario/small/mario_PNG98.png",
  },
  {
    name: "mushroom-red",
    img: "https://pngimg.com/uploads/mario/mario_PNG75.png",
  },
  {
    name: "mushroom-yello",
    img: "https://pngimg.com/uploads/mario/mario_PNG73.png",
  },
  {
    name: "luigi-stand",
    img: "https://pngimg.com/uploads/mario/mario_PNG44.png",
  },
  {
    name: "luigi-action",
    img: "https://pngimg.com/uploads/mario/mario_PNG42.png",
  },
  {
    name: "dino",
    img: "https://pngimg.com/uploads/mario/mario_PNG107.png",
  },
  {
    name: "ferret",
    img: "https://pngimg.com/uploads/mario/mario_PNG119.png",
  },
  {
    name: "bobomb",
    img: "https://pngimg.com/uploads/mario/mario_PNG128.png",
  },
  {
    name: "turtle",
    img: "https://pngimg.com/uploads/mario/small/mario_PNG98.png",
  },
  {
    name: "mushroom-red",
    img: "https://pngimg.com/uploads/mario/mario_PNG75.png",
  },
  {
    name: "mushroom-yello",
    img: "https://pngimg.com/uploads/mario/mario_PNG73.png",
  },
  {
    name: "luigi-stand",
    img: "https://pngimg.com/uploads/mario/mario_PNG44.png",
  },
  {
    name: "luigi-action",
    img: "https://pngimg.com/uploads/mario/mario_PNG42.png",
  },
];

for (let index = 0; index < cardsArray.length; index++) {
  let j = Math.ceil(Math.random() * (index + 1));
  [cardsArray[index], cardsArray[j]] = [cardsArray[j], cardsArray[index]];
}

let gameSurface = document.querySelector(".game-surface");

for (let index = 0; index < cardsArray.length; index++) {
  const { img, name } = cardsArray[index];
  let gameCard = document.createElement("div");
  gameCard.setAttribute("class", "game-card");

  let gameCardImg = document.createElement("div");
  gameCardImg.setAttribute("class", "game-card-img");

  let gameCardWrap = document.createElement("div");
  gameCardWrap.setAttribute("class", "game-card-wrap");
  gameCardWrap.setAttribute("id", `${name}`);
  gameCardWrap.setAttribute("data-id", `${index}`);
  gameCard.append(gameCardWrap);

  let cardIMg = document.createElement("img");
  cardIMg.setAttribute("src", `${img}`);
  cardIMg.setAttribute("alt", `_${name}`);
  cardIMg.setAttribute("data-img-id", `id${index}`);
  cardIMg.setAttribute("class", `card-img`);

  gameCardImg.append(cardIMg);
  gameCard.append(gameCardImg);
  gameSurface.append(gameCard);
}

let count = 0;
let record = cardsArray.reduce((acc, { name }) => {
  acc[name] = false;
  return acc;
}, {});

let score = 0;
let selectCount = 0;
let selectedChar1 = "";
let selectedChar2 = "";
let idArr = [];

gameSurface.addEventListener("click", (event) => {
  if (event.target.className === "game-card-wrap") {
    count++;
    selectCount++;
    if (count === 1) {
      timer("start");
    }
    idArr.push(event.target.dataset.id);
    if (selectCount % 2 == 0) {
      selectedChar2 = event.target.id;
    } else {
      selectedChar1 = event.target.id;
    }
    new Promise((resolve) => {
      event.target.style.transform = "rotateY(180deg)";
      event.target.style.transition = "0.3s ease-in-out";
      setTimeout(() => {
        resolve("d-none");
      }, 300);
    }).then((res) => {
      if (res) {
        event.target.className = res;
        changeAttempt(count);
      }
    });
  }

  if (selectCount == 2 && selectedChar1 === selectedChar2) {
    setTimeout(() => {
      for (let i = 0; i < idArr.length; i++) {
        document.querySelector(`[data-id~='${idArr[i]}']`).className =
          "game-card-wrap-green";
      }
      idArr = [];
      selectedChar2 = "";
      selectedChar1 = "";
      selectCount = 0;
      score++;
      changeScore(score);
    }, 1000);
  } else if (selectCount == 2 && selectedChar1 !== selectedChar2) {
    setTimeout(() => {
      for (let i = 0; i < idArr.length; i++) {
        document.querySelector(`[data-id~='${idArr[i]}']`).className =
          "game-card-wrap";
        document.querySelector(`[data-id~='${idArr[i]}']`).style = "";
      }
      idArr = [];
      selectCount = 0;
      selectedChar1 = "";
      selectedChar2 = "";
    }, 1000);
  }
});

function changeScore(score) {
  document.querySelector(".score").innerText = score;
  if (score === 8) {
    return timer("stop");
  }
}

function changeAttempt(attempt) {
  if (attempt % 2 === 0) {
    document.querySelector(".attempt").innerText = attempt / 2;
  }
}

let countTime = 0;
let seconds = 0;
let minute = 0;
let hours = 0;

let time;

function timer(action) {
  if (action === "start") {
    time = setInterval(() => {
      countTime++;
      if (countTime % 100 === 0) {
        seconds++;
        document.querySelector(".time").innerHTML = `${
          minute < 10 ? "0" + minute : minute
        }:${seconds < 10 ? "0" + seconds : seconds}`;
        if (seconds % 60 === 0) {
          seconds = 0;
          minute++;
          if (minute % 60 === 0) {
            minute = 0;
            hours++;
          }
        }
      }
    }, 10);
  } else if (action === "stop") {
    clearInterval(time);
    document.querySelector(".time").innerHTML = `${
      minute < 10 ? "0" + minute : minute
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  } else if (action === "reset") {
    countTime = 0;
    seconds = 0;
    minute = 0;
    hours = 0;
    timer("start");
  }
}
