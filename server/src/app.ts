import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();
app.use(express.json()) // for parsing application/json

app.post("/api/chat", async function (req: any, res, next) {
  axios.request({
    method: 'post',
    url: 'https://api.cloudflare.com/client/v4/accounts/9221e4c104c3998e698733957fc07a85/ai/run/@cf/meta/llama-3-8b-instruct',
    headers: {
      'Authorization': `Bearer ${process.env.CHAT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      messages: [
        {
          role: "user",
          content: req.body.question
        }
      ]
    })
  })
    .then((response) => {
      if (response.data.success) {
        res.json({ data: response.data.result.response });
      } else {
        res.json({ error: JSON.stringify(response.data.errors) });
      }
    })
    .catch(r => {
      res.json({ error: r?.response?.data?JSON.stringify(r?.response?.data):r?.response?.statusText });
    });
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err['status'] || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.status === 500 ? 'Error.' : err.message
  });
});
const port=process.env.PORT || 3004;
app.listen(port, () => {
  console.log('Server listening', port);
});
