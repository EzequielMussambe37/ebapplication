let express = require('express');


let app = express();
app.use(express.static(__dirname + '/dist/budget'));
app.get('/*', (req, resp) => {
    resp.sendFile(__dirname + '/dist/budget/index.html')
});

app.listen(process.env.PORT || 8080);
