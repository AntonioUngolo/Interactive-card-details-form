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
const thankYouButton = document.getElementById('thank_you');

function isNotANumber() {
  return 'Wrong format, numbers only';
}
function isNotAString() {
  return 'Wrong format, text only';
}

function blankContent() {
  return 'Can not be blank';
}
// This function helps to add a class when needed
const addClass = function (selector, remove, text) {
  selector.classList.add(remove);
  selector.textContent = text;
};

// This function helps to remove a class when needed
const removeClass = function (selector, remove, text) {
  selector.classList.remove(remove);
  selector.textContent = text;
};

// Check if the name is made at least by 2 words (Name and Surname)
function checkName() {
  // Remove empty string from array
  function removeEmptyStringsFromArray(arr) {
    // Filter the array only with words
    var filteredArray = arr.filter(function (value) {
      return value !== '';
    });
    return filteredArray;
  }

  const check = String(inputCardholder.value).split(' ');
  const filteredArray = removeEmptyStringsFromArray(check);

  if (filteredArray.length >= 2 && inputCardholder.value !== '') {
    return true;
  } else {
    return false;
  }
}

function expiredCard() {
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = String(date.getFullYear()).slice(2);

  if (inputMonth.value >= currentMonth && inputYear.value >= currentYear) {
    return true;
  } else {
    return false;
  }
}

const checkInputs = function () {
  const formInputs = document.querySelectorAll('.form_input');
  formInputs.forEach((form) => {
    const error = form.querySelector('.error');

    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input.value === '') {
        // error.classList.remove('hidden');
        // error.textContent = 'Can not be blank';
        removeClass(error, 'hidden', blankContent());
        input.classList.add('error__input');
      } else if (!checkName() && input.value === '') {
        // error.classList.remove('hidden');
        // error.textContent = 'You need a name and a surname';
        removeClass(error, 'hidden', blankContent());
        input.classList.add('error__input');
        checkNumberLenght();
      } else {
        // error.classList.add('hidden');
        // error.textContent = '';
        addClass(error, 'hidden', '');
        input.classList.remove('error__input');
      }
    });
  });
};

const checkNumberLenght = function () {
  if (inputNumber.value.length < 16 && !isNaN(inputNumber.value)) {
    // errorNumber.classList.remove('hidden');
    // errorNumber.textContent = 'Not enough numbers';
    if (inputNumber.value !== '') {
      removeClass(errorNumber, 'hidden', 'Not enough numbers');
    } else {
      removeClass(errorNumber, 'hidden', blankContent());
    }
    inputNumber.classList.add('error__input');
    return true;
  } else {
    // errorNumber.classList.add('hidden');
    // errorNumber.textContent = '';
    addClass(errorNumber, 'hidden', '');
    inputNumber.classList.remove('error__input');
    return false;
  }
};

inputCardholder.addEventListener('input', function () {
  const errorUser = document.getElementById('error__user');
  const pattern = /\d/; // The \d pattern matches any digit (0-9)

  if (pattern.test(inputCardholder.value)) {
    // errorUser.classList.remove('hidden');
    // errorUser.textContent = isNotAString();
    removeClass(errorUser, 'hidden', isNotAString());
  } else if (inputCardholder.value === '') {
    // const errorUser = document.getElementById('error__user');
    // errorUser.classList.remove('hidden');
    // errorUser.textContent = 'Can not be blank';
    removeClass(errorUser, 'hidden', blankContent());
    inputCardholder.classList.add('error__input');
  } else {
    // errorUser.classList.add('hidden');
    addClass(errorUser, 'hidden', '');
    labelUser.textContent = inputCardholder.value;
  }

  inputCardholder.addEventListener('blur', function () {
    if (inputCardholder.value === '') {
      removeClass(errorUser, 'hidden', blankContent());
      inputCardholder.classList.add('error__input');
    } else if (!checkName()) {
      // errorUser.classList.remove('hidden');
      // errorUser.textContent = 'You need a name and a surname';
      removeClass(errorUser, 'hidden', 'You need a name and a surname');
      inputCardholder.classList.add('error__input');
    }
  });

  if (!errorUser.classList.contains('hidden')) {
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

  if (!isNaN(inputNumber.value)) {
    // errorNumber.classList.add('hidden');
    addClass(errorNumber, 'hidden', '');
    labelNumber.textContent = formattedInput;
  } else if (inputNumber.value === '') {
    // errorNumber.classList.remove('hidden');
    // errorNumber.textContent = 'Can’t be blank';
    removeClass(errorNumber, 'hidden', blankContent());
  } else {
    // errorNumber.classList.remove('hidden');
    // errorNumber.textContent = isNotANumber();
    removeClass(errorNumber, 'hidden', isNotANumber());
  }

  if (!errorNumber.classList.contains('hidden')) {
    inputNumber.classList.add('error__input');
  } else {
    inputNumber.classList.remove('error__input');
  }

  inputNumber.addEventListener('blur', function () {
    // checkNumberLenght();
    if (checkNumberLenght()) {
      checkNumberLenght();
    } else {
      checkNumberLenght();
    }
  });
});

inputMonth.addEventListener('input', function () {
  const errorDate = document.getElementById('error__date');
  const input = inputMonth.value;
  const formattedInput = String(input).padStart(2, 0);

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
    inputMonth.classList.add('error__input');
  } else {
    inputMonth.classList.remove('error__input');
  }
});

inputYear.addEventListener('input', function () {
  const errorDate = document.getElementById('error__date');
  const date = new Date();
  const dateYear = date.getFullYear();

  if (inputYear.value === '') {
    // Display error for empty input
    errorDate.classList.remove('hidden');
    errorDate.textContent = 'Can’t be blank';
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
    inputYear.classList.add('error__input');
  } else {
    inputYear.classList.remove('error__input');
  }
});

inputCode.addEventListener('input', function () {
  const errorCode = document.getElementById('error__code');
  if (inputCode.value === '') {
    // errorCode.classList.remove('hidden');
    // errorCode.textContent = 'Can’t be blank';
    removeClass(errorCode, 'hidden', blankContent());
  } else if (isNaN(inputCode.value)) {
    // errorCode.classList.remove('hidden');
    // errorCode.textContent = 'Error cvc, numbers only';
    removeClass(errorCode, 'hidden', 'Error cvc, numbers only');
  } else {
    // errorCode.classList.add('hidden');
    addClass(errorCode, 'hidden', '');
    labelCode.textContent = inputCode.value;
  }

  if (!errorCode.classList.contains('hidden')) {
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
      inputCode.value !== '' &&
      checkName()
    ) {
      const form = document.querySelector('.form');
      form.classList.add('hidden');

      const thankYou = document.querySelector('#thank_you');
      thankYou.classList.remove('hidden');
    } else {
      if (!checkName() && error.classList.contains('hidden')) {
        const errorUser = document.getElementById('error__user');
        removeClass(errorUser, 'hidden', 'You need a name and a surname');
        inputCardholder.classList.add('error__input');
        checkInputs();
        checkNumberLenght();
      } else {
        checkInputs();
        checkNumberLenght();
      }
    }
  });
});

thankYouButton.addEventListener('click', function (e) {
  e.preventDefault();
});
