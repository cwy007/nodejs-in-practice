var dns = require('dns');

// dns.lookup takes a hostname and a callback function as arguments
// The callback function is called when the lookup is complete
// The callback function is called with three arguments:
// 1. An error object (if an error occurred)
// 2. The IP address of the host
// 3. The IP address family (4 for IPv4, 6 for IPv6)
// The following code looks up the IP address of www.manning.com
// and logs the address and family to the console
// If an error occurs, the error is logged to the console
// The address and family are logged to the console
dns.lookup('www.manning.com', function(err, address, family) {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Address:', address, 'Family:', family);
  }
});
// Address: 35.166.24.88 Family: 4

// resolve adomain name to an array of records
// The following code resolves the domain name www.manning.com
// to an array of address records (A records)
// If an error occurs, the error is logged to the console
// The addresses are logged to the console
dns.resolve('www.manning.com', 'A', function(err, addresses) {
  if (err) {
    console.error('resolve Error:', err);
  } else {
    console.log('resolve Addresses:', addresses);
  }
});
// resolve Addresses: [ '35.166.24.88' ]
