"use strict";
//require('dotenv').config();
const request = require('request');
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var locationDialog = require('botbuilder-location');


const dialogs= {};
dialogs.packageSearch = require('./packageFinder.js');

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

//var bot = new builder.UniversalBot(connector);
const bot = new builder.UniversalBot(connector, (session) => {
    const message = new builder.Message(session);
    message.text = 'How would you like to search?';
    message.attachments([
        new builder.ThumbnailCard(session)
            .buttons([
                    builder.CardAction.imBack(
                    session, dialogs.packageSearch.title, dialogs.packageSearch.title
                )
            ])
            .title('How would you like to search?')
    ]);
    session.endConversation(message);
});

//bot.dialog('/', function (session) {
//    session.send('You said ' + session.message.text);
    
//});
//bot.library(locationDialog.createLibrary("Ai7DoyEjBT1daAV55JpqSjuDuqk1YagAieCjRQTwgt0jnd8OFZwJS2Q4R4ZpkK1Z"));
bot.dialog(dialogs.packageSearch.id, dialogs.packageSearch.dialog)
    .triggerAction({ matches: new RegExp(dialogs.packageSearch.title, 'i') })
    ;


if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
