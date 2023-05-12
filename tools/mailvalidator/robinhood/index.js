const axios = require('axios');

const checkEmailOnRobinhood = async (email) => {
  try {
      const response = await axios.post('https://api.robinhood.com/oauth2/token/', {
      grant_type: 'password',
      scope: 'internal',
      client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
      expires_in: 86400,
      password: 'dummy_password',
      username: email,
      });
      if (response.data.access_token) {
         return `${email} is registered on Robinhood`;
      } else {
         return `${email} is not registered on Robinhood`;
      }
      } catch (error) {
          if (error.response && error.response.status === 400 && error.response.data.detail === 'Invalid email or password.') {
             return `${email} is not registered on Robinhood`;
           } else {
                throw error;
           }
                                                                                                  }
                                                                                                  };
checkEmailOnRobinhood('huntercarol081@gmail.com')
  .then(result => console.log(result))
    .catch(error => console.error(error));
    
