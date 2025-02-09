import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class promiseGenerator {
  constructor() {
    this.form = document.querySelector('.form');
    this.bindEvents();
  }
  formSubmit(e) {
    e.preventDefault();
    const formData = this.form.elements;
    const delayValue = parseInt(formData.delay.value, 10);
    const stateValue = formData.state.value;

    this.generatePromise(delayValue, stateValue)
      .then(delay => {
        iziToast.success({
          title: '✅',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          icon: '',
          progressBar: false,
          timeout: 8000,
          messageColor: 'white',
          backgroundColor: '#56c985',
          messageSize: '24',
          titleSize: '24',
          close: false,
          animateInside: false,
          transitionIn: 'fadeIn',
        });
      })
      .catch(delay => {
        iziToast.error({
          title: '❌',
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
          icon: '',
          progressBar: false,
          timeout: 8000,
          backgroundColor: '#fb6969',
          messageColor: 'white',
          messageSize: '24',
          titleSize: '24',
          close: false,
          animateInside: false,
          transitionIn: 'fadeIn',
        });
      })
      .finally(() => this.form.reset());
  }
  generatePromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        state === 'fulfilled' ? resolve(delay) : reject(delay);
      }, delay);
    });
  }
  bindEvents() {
    this.form.addEventListener('submit', this.formSubmit.bind(this));
  }
}

new promiseGenerator();
