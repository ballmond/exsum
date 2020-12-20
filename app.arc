@app
begin-app

@http
get /
get /exsum
get /download

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
region us-east-2
profile default