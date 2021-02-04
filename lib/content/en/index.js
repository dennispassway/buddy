"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activities_1 = require("./activities");
var activities_2 = require("./activities");
var Content = {
    ACTIVITIES: activities_1.default,
    GREETINGS: ['Hi', 'Howdy', 'Hello', 'Hey'],
    QUESTIONS: activities_2.default,
    HOME_INTRO: "This is my home :house:.\nIf you have the rights withing your organisation, you can configure my settings here.\nYou can click on 'Messages' up here to have a chat with me in private. I'd like that. :dog2:",
    SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION: 'The amount of activities that are suggested when using the activity command.',
    SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE: 'Amount of activities',
    SETTING_BUDDY_GROUP_SIZE_DESCRIPTION: 'The size of the groups.\nExample: settings this to 3 in an organsation with 21 member will create 7 groups of 3 members.',
    SETTING_BUDDY_GROUP_SIZE_TITLE: 'Buddy group size',
    SETTING_DAY_TO_REGENERATE_DESCRIPTION: 'New groups will be formed every week. This is the day of the week that new groups will be formed.',
    SETTING_DAY_TO_REGENERATE_TITLE: 'Day to regroup',
    SETTING_LANGUAGE_DESCRIPTION: 'The language Buddy speaks.',
    SETTING_LANGUAGE_TITLE: 'Language',
    SETTING_UTC_OFFSET_DESCRIPTION: 'This UTC timezone is used to make sure that the groups are regrouped on the day in your timezone.',
    SETTING_UTC_OFFSET_TITLE: "Your team's timezone (UTC).",
    SETTING_USERS_TO_IGNORE_DESCRIPTION: 'Select a list of users that will be excluded from the buddy making process.',
    SETTING_USERS_TO_IGNORE_TITLE: 'Users to ignore',
    GENERAL_SETTINGS_TITLE: 'General Settings',
    CREATE_BUDDIES_SETTINGS: 'Buddies creation settings',
    REGROUP_BUDDIES_TITLE: 'Regroup buddies',
    REGROUP_BUTTON_LABEL: 'Regroup buddies now',
    YOU_ARE_BUDDIES_FOR: 'You are buddies for',
    WEEK: 'this week',
    ACTIVITIES_INTRO: 'Here are some activities you could do together:',
    QUESTION_INTRO: "Here's a question to discuss together:",
    YOUR_ARE_BUDDIES_WITH: 'You are currently buddies with',
    YOU_CAN_CHAT_WITH_THEM_HERE: 'You can easily chat with them in your channel:',
    CURRENT_GROUPS_ARE: 'The current groups of buddies are:',
    SOMETHING_WENT_WRONG: ':dog: Woofps, something went wrong. Please try again.',
    NOT_IN_GROUP: 'You are not in a group at the moment.',
    NO_GROUPS: 'There are no groups at the moment.',
    UNKNOWN_COMMAND: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: ":dog: Woofps, I don't know what to to do with that command. Try one of the following:",
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*/buddy activity*\nPosts an activity to do with your group in the current channel.',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*/buddy group*\nShows you what your buddies currently are.',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*/buddy groups*\nShows you all of the buddy groups in your organisation.',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*/buddy question*\nPosts a question to answer with your group in the current channel.',
            },
        },
    ],
};
exports.default = Content;
