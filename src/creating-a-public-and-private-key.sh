# crete server's private key using 1-24 bits
openssl genrsa -out server.pem 1024
# create csr - this is where you emter your hostname
openssl req -new -key server.pem -out server-csr.pem
# sign server's privite key
openssl x509 -req -in server-csr.pem -signkey server.pem -out server-cert.pem


# create client's private key
openssl genrsa -out client.pem 1024
# create csr for the client - remember to enter your hostname here as well.
openssl req -new -key client.pem -out client-csr.pem
# sign client's private key and output a public key
openssl x509 -req -in client-csr.pem -signkey client.pem -out client-cert.pem
