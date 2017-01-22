"use strict";

var Hello = function(controller, middleware) {

    var conversationSource = require('./source.js')(controller);

    controller.hears(['hello|hi|hallo'], 'direct_message,direct_mention,mention', middleware.process, conversationSource.hello);

    controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', middleware.process, conversationSource.callMe);

    controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', middleware.process, conversationSource.whoAmI);

};

module.exports = Hello;