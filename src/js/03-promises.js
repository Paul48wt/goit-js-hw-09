import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const promiseArray = [];
form.addEventListener('submit', onFormInput);

function onFormInput(event) {
  event.preventDefault();
  let {
    elements: { delay, step, amount },
  } = event.currentTarget;
  delay = Number(delay.value);
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += Number(step.value);
  }
}

function createPromise(position, delay) {
  // console.log(position, delay);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill

        resolve({
          position,
          delay,
        });
      } else {
        // Reject

        reject({
          position,
          delay,
        });
      }
    }, delay);
  });
}
