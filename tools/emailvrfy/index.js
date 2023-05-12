const dns = require('dns');
const net = require('net');
function verifyEmailSMTP(email, domain, smtpServer, callback) {
  // Lookup MX records for the domain
  let mx =(ms)=>{
     console.log(ms)
     for(const m of ms){
       let server=m.exchange;
       try{
         const smtpSocket = net.createConnection(587,smtp.gmail.com)
        console.log(smtoSocket)
      smtpSocket.on('connect', function(err,m) {
         smtpSocket.once('data', function(data) {
            console.log(data)
         })
         console.log(err);
         console.log(m)
        })
       }catch(err){
        console.log("failed to connect")
       }
      }

  }
     dns.resolveMx(domain, function(err, mxRecords) {
       console.log('first',mxRecords)
    if (mxRecords.length !==0) {
      console.log("yh")
        mx(mxRecords);
       return;
    }else{
      console.log("no mxRecords found for:" + domain )
    }
   
    // Connect to the SMTP server
   console.log("second",mx)
    const smtpSocket = net.createConnection(587, smtpServer);

    smtpSocket.on('connect', function() {
      // Wait for the SMTP server to send the greeting message
      smtpSocket.once('data', function(data) {
        // Send HELO8 ommand
        console.log(data)
        smtpSocket.write('HELO ' + domain + '\r\n');
        
        // Wait for the server to respond
        smtpSocket.once('data', function(data) {
          // Send MAIL FROM command
          smtpSocket.write('MAIL FROM:<' + email + '>\r\n');

          // Wait for the server to respond
          smtpSocket.once('data', function(data) {
            // Send RCPT TO command
            smtpSocket.write('RCPT TO:<' + email + '>\r\n');

            // Wait for the server to respond
            smtpSocket.once('data', function(data) {
              // Check if the email address is valid
              if (data.toString().indexOf('250 2.1.5') !== -1) {
                callback(null, true);
              } else {
                callback(null, false);
              }
              smtpSocket.end();
            });
          });
        });
      });
    });

    smtpSocket.on('error', function(err) {
      callback(err);
    });
  });
}

// Example usage
verifyEmailSMTP('example@gmail.com', 'gmail.com', 'gmail-smtp-in.l.google.com', function(err, isValid) {
  if (err) {
    console.error(err);
  } else {
    console.log('Email is valid:', isValid);
  }
});
