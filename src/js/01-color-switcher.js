
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId;

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);


function onClickStart(){
    intervalId = setInterval(() => {
        const randomColor = getRandomHexColor();
        document.body.style.backgroundColor = randomColor; 
    }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onClickStop(){
    refs.stopBtn.disabled = true; 
    refs.startBtn.disabled = false;
    clearInterval(intervalId); 
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }