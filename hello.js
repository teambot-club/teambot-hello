"use strict";

var Hello = function(controller) {

    var startAskForNameConversation = function(bot, message) {
            bot.startConversation(message, function(err, convo) {

                convo.say('I do not know your name yet!');
                convo.ask('What should I call you?', function(response, convo) {

                    convo.next();

                }, { 'key': 'nickname' }); // store the results in a field called nickname

                convo.on('end', function(convo) {
                    if (convo.status == 'completed') {

                        controller.storage.users.get(message.user, function(err, user) {
                            if (!user) {
                                user = {
                                    id: message.user,
                                };
                            }
                            user.name = convo.extractResponse('nickname');
                            controller.storage.users.save(user, function(err, id) {
                                bot.reply(message, 'Nice to meet you ' + user.name + '!');
                            });
                        });



                    } else {
                        // this happens if the conversation ended prematurely for some reason
                        bot.reply(message, 'OK, nevermind!');
                    }
                });

            });
        },

        hello = function(bot, message) {

            bot.api.reactions.add({
                timestamp: message.ts,
                channel: message.channel,
                name: 'robot_face',
            }, function(err, res) {
                if (err) {
                    console.log('Failed to add emoji reaction :(', err);
                }
            });


            controller.storage.users.get(message.user, function(err, user) {
                if (user && user.name) {
                    bot.reply(message, 'Hello ' + user.name + '!!');
                } else {
                    bot.reply(message, 'Hello.');
                    startAskForNameConversation(bot, message);

                }
            });
        },

        callMe = function(bot, message) {
            var name = message.match[1];
            controller.storage.users.get(message.user, function(err, user) {
                if (!user) {
                    user = {
                        id: message.user,
                    };
                }
                user.name = name;
                controller.storage.users.save(user, function(err, id) {
                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                });
            });
        },

        whoAmI = function(bot, message) {
            controller.storage.users.get(message.user, function(err, user) {
                if (user && user.name) {
                    bot.reply(message, 'Your name is ' + user.name);
                } else {
                    startAskForNameConversation(bot, message);
                }
            });
        };

    return {
        hello: hello,
        callMe: callMe,
        whoAmI: whoAmI
    };
};

module.exports = Hello;