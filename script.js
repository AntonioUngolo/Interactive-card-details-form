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

inputCardholder.addEventListener('input', function () {
  labelUser.textContent = inputCardholder.value;
});

inputNumber.addEventListener('input', function () {
  labelNumber.textContent = inputNumber.value;
});

inputMonth.addEventListener('input', function () {
  labelExpireMonth.textContent = inputMonth.value;
});

inputYear.addEventListener('input', function () {
  labelExpireYear.textContent = inputYear.value;
});

inputCode.addEventListener('input', function () {
  labelCode.textContent = inputCode.value;
});
