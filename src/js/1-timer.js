import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class CountdownTimer {
  constructor() {
    this.startButton = document.querySelector('[data-start]');
    this.datetimePicker = document.querySelector('#datetime-picker');
    this.daysElement = document.querySelector('[data-days]');
    this.hoursElement = document.querySelector('[data-hours]');
    this.minutesElement = document.querySelector('[data-minutes]');
    this.secondsElement = document.querySelector('[data-seconds]');
    this.userSelectedDate = null;
    this.countdownInterval = null;
    this.startButton.disabled = true;

    this.initFlatpickr();
    this.startButton.addEventListener('click', () => this.startCountdown());
  }

  initFlatpickr() {
    flatpickr(this.datetimePicker, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: selectedDates => this.handleDateSelection(selectedDates),
    });
  }

  handleDateSelection(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      this.userSelectedDate = selectedDate;
      this.startButton.disabled = false;
    } else {
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#fb6969',
        messageColor: 'white',
        icon: '',
        progressBar: false,
        timeout: 20000,
        animateInside: false,
        messageSize: '16',
        transitionIn: 'fadeIn',
      });
      this.startButton.disabled = true;
    }
  }

  startCountdown() {
    this.startButton.disabled = true;
    this.datetimePicker.disabled = true;

    this.countdownInterval = setInterval(() => {
      const timeLeft = this.userSelectedDate - new Date();
      if (timeLeft <= 0) {
        clearInterval(this.countdownInterval);
        this.updateTimerDisplay(0, 0, 0, 0);
        this.datetimePicker.disabled = false;
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(timeLeft);
      this.updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);
  }

  convertMs(ms) {
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

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  updateTimerDisplay(days, hours, minutes, seconds) {
    this.daysElement.textContent = this.addLeadingZero(days);
    this.hoursElement.textContent = this.addLeadingZero(hours);
    this.minutesElement.textContent = this.addLeadingZero(minutes);
    this.secondsElement.textContent = this.addLeadingZero(seconds);
  }
}

new CountdownTimer();
