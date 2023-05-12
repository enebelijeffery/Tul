const axios = require('axios');

const checkIfEmailIsOnCitibank = async (email) => {
  try {
    const response = await axios.get(`https://online.citi.com/US/ag/citibank/cardMember/emailLookup.do?request_locale=en_US&emailAddress=${email}`);
    console.log(response)
    if (response.data.success) {
      return `${email} is registered with Citibank`;
    } else {
      return `${email} is not registered with Citibank`;
    }
  } catch (error) {
    console.error(error);
  }
};

checkIfEmailIsOnCitibank('example@gmail.com')
  .then(result => console.log(result))
  .catch(error => console.error(error));
