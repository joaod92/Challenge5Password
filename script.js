// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  // Prompt for password length
  var length = parseInt(prompt('Enter the length of your password (between 8 and 128 characters):'));

  // Validate the length
  if (isNaN(length) || length < 8 || length > 128) {
    alert('Please enter a valid number between 8 and 128.');
    return null;
  }

  // Prompt for character types
  var useLowercase = confirm('Include lowercase characters?');
  var useUppercase = confirm('Include uppercase characters?');
  var useNumeric = confirm('Include numeric characters?');
  var useSpecial = confirm('Include special characters?');

  // Validate that at least one character type is selected
  if (!useLowercase && !useUppercase && !useNumeric && !useSpecial) {
    alert('Please select at least one character type.');
    return null;
  }

  // Return an object with user choices
  return {
    length: length,
    useLowercase: useLowercase,
    useUppercase: useUppercase,
    useNumeric: useNumeric,
    useSpecial: useSpecial,
  };
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  if (!options) {
    // If options are not valid, return an empty string
    return '';
  }

  var possibleCharacters = [];
  var guaranteedCharacters = [];

  // Add selected character types to the pool of possible characters
  if (options.useLowercase) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }
  if (options.useUppercase) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }
  if (options.useNumeric) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }
  if (options.useSpecial) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  // Generate the remaining characters randomly
  var remainingLength = options.length - guaranteedCharacters.length;
  for (var i = 0; i < remainingLength; i++) {
    var randomChar = getRandom(possibleCharacters);
    guaranteedCharacters.push(randomChar);
  }

  // Shuffle the characters to make the password more random
  var shuffledPassword = guaranteedCharacters.sort(function () {
    return 0.5 - Math.random();
  });

  // Convert the array to a string and return the password
  return shuffledPassword.join('');
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);