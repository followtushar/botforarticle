var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () { });



// Create the chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '55b76b49-41b1-4e6a-b2ab-0bb292f30f26',
    appPassword: 'xvCReivthZKVTTU3whAZrn7'
});


// Listen for messages from users 
server.post('/api/messages', connector.listen());

server.get('/', restify.plugins.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));


var bot = new builder.UniversalBot(connector, function (session) {
    var msg = session.message;
    if (msg.attachments && msg.attachments.length > 0) {
     // Echo back attachment
     var attachment = msg.attachments[0];
        session.send({
            text: "You sent:",
            attachments: [
                {
                    contentType: attachment.contentType,
                    contentUrl: attachment.contentUrl,
                    name: attachment.name
                }
            ]
        });
    } else {
        // Echo back users text
        session.send("You said: %s", session.message.text);
    }
});
