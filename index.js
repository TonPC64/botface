var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello Word')
})

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'bot_messenger_page') {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong validation token')
})

app.post('/webhook/', function (req, res) {
  console.log(req.body)
  messaging_events = req.body.entry[0].messaging
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i]
    sender = event.sender.id
    if (event.message && event.message.text) {
      text = event.message.text
      // Handle a text message from this sender
      console.log(text)
      sendTextMessage(sender, 'Text received, echo: ' + text.substring(0, 200))
    }
  }
  res.sendStatus(200)
})

var token = 'CAAOZBaoxks00BAEuYKqxS0jcxyVPG88BtmZCjoxkuE9ClJHPBxlS93xmaJYXNZCYkpW2XX4U7RrIYK8YZA2wTe7ZCOl21WXenmxViZBLOZB9EYXXl1KmOBrPG01rUm44JlIkJR7t5FltgI6qaSramJH38lZB6rZB04qvI4Qw5nLb2JPmLGYPGhavZCQZCqNAArSd56S7xGmZAikFSwZDZD'

function sendTextMessage (sender, text) {
  messageData = {
    text: text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData,
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending message: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function () {
  console.log('Server Start at port ', app.get('port'))
})
