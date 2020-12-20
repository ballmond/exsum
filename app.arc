@app
begin-app

@http
get /
get /exsum
get /download
get /download:study

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
