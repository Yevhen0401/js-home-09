import Notiflix from 'notiflix';


const refs = {
inputDelay: document.querySelector('input[name="delay"]'),
inputStep: document.querySelector('input[name="step"]'),
inputAmount: document.querySelector('input[name="amount"]'),
form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit);

function makePromise({delay, step, amount}){
  for(let i = 1; i <= amount; i+=1) {
createPromise(i, delay).then(onFulfill).catch(onReject);
delay += step;
  }
};

function onFulfill({position, delay}){
Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,{
    timeout: 6000,
    width: '300px',
    clickToClose: true,
    position: "right-top",
});
};

function onReject({position, delay}){
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,{
      timeout: 6000,
      width: '300px',
      clickToClose: true,
      position: "right-top",
  });
  };

function onSubmit(evt){
  evt.preventDefault();
  const data = {
    delay: parseInt(refs.inputDelay.value),
    step: parseInt(refs.inputStep.value),
    amount: parseInt(refs.inputAmount.value)
  };
  makePromise(data);
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
if (shouldResolve) {
  resolve({position, delay});
} else {
  reject({position, delay})
}
}, delay);
  });
}



