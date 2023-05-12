const axios = require('axios');
const cheerio = require('cheerio');

async function isEmailRegistered(email) {
  const url = `https://seekingalpha.com/user/account_password_recovery_email?email=${email}`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const result = $('p[class="js-email-does-not-exist"]').text().trim();
    return result !== 'This email does not exist.';
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Usage example
const email = 'samalexnder081@gmail.com';
isEmailRegistered(email)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
