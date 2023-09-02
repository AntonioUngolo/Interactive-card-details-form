'use strict';

const inputCardholder = document.querySelector('#input_user');
const inputNumber = document.querySelector('#input_number');
const inputMonth = document.querySelector('#input_month');
const inputYear = document.querySelector('#input_year');
const inputCode = document.querySelector('#input_code');

const labelUser = document.querySelector('#cc_user');
const labelNumber = document.querySelector('#cc_number');
const labelExpireMonth = document.querySelector('#expire_month');
const labelExpireYear = document.querySelector('#expire_year');
const labelCode = document.querySelector('#cc_code');

const submitButton = document.getElementById('submit_button');

function isNotANumber() {
  return 'Wrong format, numbers only';
}
function isNotAString() {
  return 'Wrong format, text only';
}

function expiredCard() {
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = String(date.getFullYear()).slice(2);

  if (inputMonth.value >= currentMonth && inputYear.value >= currentYear) {
    console.log('Card is not expired');
  } else {
    console.log('Card is Expired');
  }
}

inputCardholder.addEventListener('input', function () {
  const errorUser = document.getElementById('error__user');
  const pattern = /\d/; // The \d pattern matches any digit (0-9)

  if (pattern.test(inputCardholder.value)) {
    errorUser.classList.remove('hidden');
    errorUser.textContent = isNotAString();
  } else {
    labelUser.textContent = inputCardholder.value;
    errorUser.classList.add('hidden');
  }

  if (!errorUser.classList.contains('hidden')) {
    // console.log('Error Visible');
    inputCardholder.classList.add('error__input');
  } else {
    inputCardholder.classList.remove('error__input');
  }
});

inputNumber.addEventListener('input', function (e) {
  const errorNumber = document.getElementById('errorNumber');
  const input = inputNumber.value;
  const inputPad = String(input).padStart(16, 0);
  const formattedInput = inputPad.replace(/(.{4})/g, '$1 ');
  // console.log(formattedInput);
  if (!isNaN(inputNumber.value)) {
    labelNumber.textContent = formattedInput;
    errorNumber.classList.add('hidden');
  } else {
    // console.log('Wrong format, numbers only');
    errorNumber.classList.remove('hidden');
    errorNumber.textContent = isNotANumber();
  }

  if (!errorNumber.classList.contains('hidden')) {
    // console.log('Error Visible');
    inputNumber.classList.add('error__input');
  } else {
    inputNumber.classList.remove('error__input');
  }
});

inputMonth.addEventListener('input', function () {
  const errorDate = document.getElementById('error__date');
  const input = inputMonth.value;
  const formattedInput = String(input).padStart(2, 0);

  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = String(date.getFullYear()).slice(2);

  if (inputMonth.value === '') {
    errorDate.classList.remove('hidden');
    errorDate.textContent = 'Can’t be blank';
  } else if (
    inputMonth.value > 12 ||
    inputMonth.value < 1 ||
    isNaN(inputMonth.value)
  ) {
    errorDate.classList.remove('hidden');
    errorDate.textContent = 'Error input month';
  } else if (
    inputMonth.value >= currentMonth &&
    inputYear.value >= currentYear
  ) {
    errorDate.classList.remove('hidden');
    errorDate.textContent = 'Expired Card';
  } else {
    labelExpireMonth.textContent = formattedInput;
    errorDate.classList.add('hidden');
  }

  inputMonth.addEventListener('blur', function () {
    const input = inputMonth.value;
    const formattedInput = String(input).padStart(2, 0);
    inputMonth.value = formattedInput;
  });

  if (!errorDate.classList.contains('hidden')) {
    // console.log('Error Visible');
    inputMonth.classList.add('error__input');
  } else {
    // console.log('Error not Visible');
    inputMonth.classList.remove('error__input');
  }

  expiredCard();
});

inputYear.addEventListener('input', function () {
  const errorDate = document.getElementById('error__date');
  const date = new Date();
  const dateYear = date.getFullYear();

  if (inputYear.value === '') {
    // Display error for empty input
    errorDate.classList.remove('hidden');
    errorDate.textContent = 'Can’t be blank';
    console.log('Cannot be empty');
  } else if (inputYear.value < String(dateYear).slice(2)) {
    // Display error for an expired card
    errorDate.classList.remove('hidden');
    errorDate.textContent = 'Expired Card';
  } else if (isNaN(inputYear.value)) {
    // Display error for an expired card
    errorDate.classList.remove('hidden');
    errorDate.textContent = 'Error Year';
  } else {
    // Clear errors if no issues
    errorDate.classList.add('hidden');
    errorDate.textContent = '';
    labelExpireYear.textContent = inputYear.value;
  }

  if (!errorDate.classList.contains('hidden')) {
    console.log('Error Visible');
    inputYear.classList.add('error__input');
  } else {
    inputYear.classList.remove('error__input');
  }

  expiredCard();
});

inputCode.addEventListener('input', function () {
  const errorCode = document.getElementById('error__code');
  if (inputCode.value === '') {
    errorCode.classList.remove('hidden');
    errorCode.textContent = 'Can’t be blank';
  } else if (isNaN(inputCode.value)) {
    errorCode.classList.remove('hidden');
    errorCode.textContent = 'Error cvc, numbers only';
  } else {
    errorCode.classList.add('hidden');
    labelCode.textContent = inputCode.value;
  }

  if (!errorCode.classList.contains('hidden')) {
    console.log('Error Visible');
    inputCode.classList.add('error__input');
  } else {
    inputCode.classList.remove('error__input');
  }
});

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  const errorLabels = document.querySelectorAll('.error');
  errorLabels.forEach((error) => {
    if (
      error.classList.contains('hidden') &&
      inputCardholder.value !== '' &&
      inputNumber.value !== '' &&
      inputMonth.value !== '' &&
      inputYear.value !== '' &&
      inputCode.value !== ''
    ) {
      // The 'hidden' class is present in the 'error' div
      // console.log('The error div is hidden');
      // console.log('Click submit');
      // alert('Can continue');
      const form = document.querySelector('.form');
      form.classList.add('hidden');
    } else {
      // The 'hidden' class is not present in the 'error' div
      console.log('Can not continue');
    }
  });
});
