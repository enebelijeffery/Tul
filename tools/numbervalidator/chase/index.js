const axios = require('axios');

const checkIfPhoneNumberIsOnChase = async (phoneNumber) => {
  try {
      const response = await axios.get(`https://www.chase.com/content/chase-ux/lookup/personal-lookup.json?phoneNumber=${phoneNumber}`);
          if (response.data.accounts.length > 0) {
                return `${phoneNumber} is registered with Chase Bank`;
                    } else {
                          return `${phoneNumber} is not registered with Chase Bank`;
                              }
                                } catch (error) {
                                    console.error(error);
                                      }
                                      };
checkIfPhoneNumberIsOnChase('5551234567')
  .then(result => console.log(result))
    .catch(error => console.error(error));
    
