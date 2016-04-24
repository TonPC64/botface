var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3000))


app.listen(app.get('port'), function () {
  console.log('Server Start at port ', app.get('port'))
})
