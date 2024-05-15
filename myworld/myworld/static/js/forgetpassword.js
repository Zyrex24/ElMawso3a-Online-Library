// function resetPassword() {
//     let user = localStorage.getItem('user');
//     if (!user) {
//         alert('No user found.');
//         return;
//     }

//     let newPassword = generatePassword();

//     let userRecords = JSON.parse(localStorage.getItem('users')) || [];
//     userRecords.forEach((record) => {
//         if (record.user === user) {
//             record.password = newPassword;
//         }
//     });
//     localStorage.setItem('users', JSON.stringify(userRecords));


//     alert('Your new password is: ' + newPassword);

//     navigator.clipboard.writeText(newPassword)
//         .then(() => {
//             console.log('New password copied to clipboard');
//         })
//         .catch((err) => {
//             console.error('Failed to copy new password to clipboard: ', err);
//         });
// }

// function generatePassword() {
//     const lowercase = 'abcdefghijklmnopqrstuvwxyz';
//     const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const numbers = '0123456789';
//     const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

//     let password = '';
//     password += getRandomCharacter(lowercase); 
//     password += getRandomCharacter(uppercase); 
//     password += getRandomCharacter(numbers); 
//     password += getRandomCharacter(specialChars); 


//     const remainingLength = 8 - password.length;
//     for (let i = 0; i < remainingLength; i++) {
//         const characterSet = lowercase + uppercase + numbers + specialChars;
//         password += getRandomCharacter(characterSet);
//     }


//     password = password.split('').sort(() => Math.random() - 0.5).join('');

//     return password;
// }

// function getRandomCharacter(characterSet) {
//     const randomIndex = Math.floor(Math.random() * characterSet.length);
//     return characterSet[randomIndex];
// }
