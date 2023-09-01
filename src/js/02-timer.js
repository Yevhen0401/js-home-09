import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    daysBtn: document.querySelector('[data-days]'),
    hoursBtn: document.querySelector('[data-hours]'),
    minutesBtn: document.querySelector('[data-minutes]'),
    secondsBtn: document.querySelector('[data-seconds]'),
    dateTime: document.querySelector('input#datetime-picker'),
}

refs.startBtn.disabled = true;

let selectedDate = null;
let counter = 0;
   
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < Date.now()) {
Notiflix.Notify.failure('Please choose a date in future', {
    timeout: 6000,
    width: '300px',
    clickToClose: true,
    position: 'center-top',
});
selectedDate = new Date();
      } else {
        refs.startBtn.disabled = false;
        selectedDate = selectedDates[0];
      }
    },
  };

  flatpickr(refs.dateTime, options);
  refs.startBtn.addEventListener('click', startTimer);

  function startTimer() {
    refs.startBtn.disabled = true;
    refs.dateTime.disabled = true;
    intervalId = setInterval(() => {
        counter = selectedDate.getTime() - Date.now();
        if(counter <= 0) {
            clearInterval(intervalId);
        }else{
            updateDisplay(counter);
        }
    },1000);
  };

  function updateDisplay(data){
    data = convertMs(counter);
    refs.daysBtn.textContent = addLeadingZero(data.days);
    refs.hoursBtn.textContent = addLeadingZero(data.hours);
    refs.minutesBtn.textContent = addLeadingZero(data.minutes);
    refs.secondsBtn.textContent = addLeadingZero(data.seconds);
  }

  function addLeadingZero(value) {
    return  String(value).padStart(2,'0');
 };


  function convertMs(ms) {
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }