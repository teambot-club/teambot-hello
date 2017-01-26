# TEAMBOT-HELLO

[![Slack Channel](https://img.shields.io/badge/slack-channel-blue.svg)](https://teambotclub.slack.com/messages/public)

This is a sample hello world skill for [Teambot](https://github.com/teambot-club/teambot). Its main purpose is to show how easy is skill development for [Teambot](https://github.com/teambot-club/teambot). There are few rules that the [Teambot](https://github.com/teambot-club/teambot) skill developers need to follow and that's it:

- The skill entry point is [index.js](index.js)
- index.js should exports a function that takes 2 arguments: 
    
    - controller
    - middleware

Both arguments comes from [Botkit](https://github.com/howdyai/botkit/blob/master/readme-slack.md) so you have the entire set of [Botkit](https://github.com/howdyai/botkit/blob/master/readme-slack.md) features in place.

- index.js contains mapping between patterns and methods. In this way when Teambot receive a message that contains the defined pattern, its corresponding method will be called. More detaile can be found in [Botkit documentation](https://github.com/howdyai/botkit#receiving-messages).
- In order to have well structured Teambot skill the methods that are mapped to patterns could be in separate file(s).
- Every file should export function that takes 1 argument - controller
- Every method that is mapped to a pattern should takes 2 arguments: bot and message