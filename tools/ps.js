 const net = require('net');

// Set the range of IP addresses to scan
const startIp = '172.31.11.1';
const endIp = '172.31.11.255';

// Set the port to scan for SMTP
const port = 25;

// Function to check if a port is open on a given IP address
function checkPort(ip, port) {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(2000); // Set the timeout to 2 seconds
    socket.on('connect', () => {
      socket.end();
      resolve(ip);
    });
    socket.on('timeout', () => {
      socket.destroy();
      reject();
    });
    socket.on('error', () => {
      socket.destroy();
      reject();
    });
    socket.connect(port, ip);
  });
}

// Function to scan a range of IP addresses for an open SMTP port
async function scanSmtp() {
  const ips = [];
  for (let i = startIp.split('.')[3]; i <= endIp.split('.')[3]; i++) {
    ips.push(startIp.split('.').slice(0,3).join('.') + '.' + i);
  }
  const results = await Promise.all(ips.map(ip => checkPort(ip, port).catch(() => false)));
  const smtpServers = results.filter(ip => ip !== false);
  console.log(`Found ${smtpServers.length} SMTP servers:\n${smtpServers.join('\n')}`);
}

// Call the scan function
scanSmtp();
