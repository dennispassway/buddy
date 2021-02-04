"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommand = void 0;
var _a = require("./translate"), ACTIVITIES_INTRO = _a.ACTIVITIES_INTRO, ACTIVITIES = _a.ACTIVITIES, CURRENT_GROUPS_ARE = _a.CURRENT_GROUPS_ARE, GREETINGS = _a.GREETINGS, NO_GROUPS = _a.NO_GROUPS, NOT_IN_GROUP = _a.NOT_IN_GROUP, QUESTION_INTRO = _a.QUESTION_INTRO, QUESTIONS = _a.QUESTIONS, SOMETHING_WENT_WRONG = _a.SOMETHING_WENT_WRONG, UNKNOWN_COMMAND = _a.UNKNOWN_COMMAND, YOU_CAN_CHAT_WITH_THEM_HERE = _a.YOU_CAN_CHAT_WITH_THEM_HERE, YOUR_ARE_BUDDIES_WITH = _a.YOUR_ARE_BUDDIES_WITH, translate = _a.translate;
var captureException = require("./sentry").captureException;
var _b = require("./database"), getGroupForMember = _b.getGroupForMember, getLatestGroups = _b.getLatestGroups, getSettings = _b.getSettings;
var randomFromArray = require("./utils").randomFromArray;
var _c = require("./constants"), SETTING_ACTIVITIES_SUGGESTION_AMOUNT = _c.SETTING_ACTIVITIES_SUGGESTION_AMOUNT, DEFAULT_SETTINGS = _c.DEFAULT_SETTINGS;
function handleUnknown(_a) {
    var channel_id = _a.channel_id, client = _a.client, user_id = _a.user_id;
    return __awaiter(this, void 0, void 0, function () {
        var blocks;
        return __generator(this, function (_b) {
            blocks = translate(UNKNOWN_COMMAND);
            return [2 /*return*/, client.chat.postEphemeral({
                    channel: channel_id,
                    blocks: blocks,
                    user: user_id,
                })];
        });
    });
}
function handleActivity(_a) {
    var say = _a.say;
    return __awaiter(this, void 0, void 0, function () {
        var settings, amount, activities;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getSettings()];
                case 1:
                    settings = _b.sent();
                    amount = settings[SETTING_ACTIVITIES_SUGGESTION_AMOUNT] ||
                        DEFAULT_SETTINGS[SETTING_ACTIVITIES_SUGGESTION_AMOUNT];
                    activities = randomFromArray(translate(ACTIVITIES), amount).join("\n• ");
                    return [2 /*return*/, say({
                            blocks: [
                                {
                                    type: "section",
                                    text: { type: "mrkdwn", text: translate(ACTIVITIES_INTRO) },
                                },
                                { type: "section", text: { type: "mrkdwn", text: "\u2022 " + activities } },
                            ],
                        })];
            }
        });
    });
}
function handleQuestion(_a) {
    var say = _a.say;
    return __awaiter(this, void 0, void 0, function () {
        var question;
        return __generator(this, function (_b) {
            question = randomFromArray(translate(QUESTIONS));
            return [2 /*return*/, say({
                    blocks: [
                        {
                            type: "section",
                            text: { type: "mrkdwn", text: translate(QUESTION_INTRO) },
                        },
                        { type: "section", text: { type: "mrkdwn", text: "*" + question + "*" } },
                    ],
                })];
        });
    });
}
function handleGroup(_a) {
    var channel_id = _a.channel_id, client = _a.client, user_id = _a.user_id;
    return __awaiter(this, void 0, void 0, function () {
        var group, channel, members, membersString;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getGroupForMember(user_id)];
                case 1:
                    group = _b.sent();
                    if (!group) {
                        return [2 /*return*/, client.chat.postEphemeral({
                                channel: channel_id,
                                blocks: [
                                    {
                                        type: "section",
                                        text: { type: "mrkdwn", text: translate(NOT_IN_GROUP) },
                                    },
                                ],
                                user: user_id,
                            })];
                    }
                    channel = group.channel, members = group.members;
                    membersString = members
                        .filter(function (id) { return id !== user_id; })
                        .map(function (member) { return "<@" + member + ">"; })
                        .join(", ");
                    return [2 /*return*/, client.chat.postEphemeral({
                            channel: channel_id,
                            blocks: [
                                {
                                    type: "section",
                                    text: {
                                        type: "mrkdwn",
                                        text: randomFromArray(translate(GREETINGS)) + " <@" + user_id + ">! :wave:",
                                    },
                                },
                                {
                                    type: "section",
                                    text: {
                                        type: "mrkdwn",
                                        text: translate(YOUR_ARE_BUDDIES_WITH) + " " + membersString + ".",
                                    },
                                },
                                {
                                    type: "section",
                                    text: {
                                        type: "mrkdwn",
                                        text: translate(YOU_CAN_CHAT_WITH_THEM_HERE) + " <#" + channel + ">.",
                                    },
                                },
                            ],
                            user: user_id,
                        })];
            }
        });
    });
}
function handleGroups(_a) {
    var channel_id = _a.channel_id, client = _a.client, user_id = _a.user_id;
    return __awaiter(this, void 0, void 0, function () {
        var groups;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getLatestGroups(1)];
                case 1:
                    groups = _b.sent();
                    if (!groups || groups.length === 0) {
                        return [2 /*return*/, client.chat.postEphemeral({
                                channel: channel_id,
                                blocks: [
                                    {
                                        type: "section",
                                        text: { type: "mrkdwn", text: translate(NO_GROUPS) },
                                    },
                                ],
                                user: user_id,
                            })];
                    }
                    return [2 /*return*/, client.chat.postEphemeral({
                            channel: channel_id,
                            blocks: [
                                {
                                    type: "section",
                                    text: {
                                        type: "mrkdwn",
                                        text: randomFromArray(translate(GREETINGS)) + " <@" + user_id + ">! :wave:",
                                    },
                                },
                                {
                                    type: "section",
                                    text: { type: "mrkdwn", text: translate(CURRENT_GROUPS_ARE) },
                                },
                                {
                                    type: "section",
                                    text: {
                                        type: "mrkdwn",
                                        text: "\u2022 " + groups
                                            .map(function (_a) {
                                            var members = _a.members;
                                            return members.map(function (member) { return "<@" + member + ">"; }).join(", ");
                                        })
                                            .join("\n• "),
                                    },
                                },
                            ],
                            user: user_id,
                        })];
            }
        });
    });
}
function handleError(_a) {
    var channel_id = _a.channel_id, client = _a.client, error = _a.error, user_id = _a.user_id;
    return __awaiter(this, void 0, void 0, function () {
        var text;
        return __generator(this, function (_b) {
            captureException(error);
            text = translate(SOMETHING_WENT_WRONG);
            return [2 /*return*/, client.chat.postEphemeral({
                    channel: channel_id,
                    text: text,
                    user: user_id,
                })];
        });
    });
}
function handleCommand(_a) {
    var ack = _a.ack, client = _a.client, command = _a.command, say = _a.say;
    return __awaiter(this, void 0, void 0, function () {
        var handlers, channel_id, user_id, text, key, handler, error_1, channel_id, user_id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, ack()];
                case 1:
                    _b.sent();
                    handlers = {
                        activity: handleActivity,
                        group: handleGroup,
                        groups: handleGroups,
                        question: handleQuestion,
                    };
                    channel_id = command.channel_id, user_id = command.user_id, text = command.text;
                    key = text.trim().toLowerCase();
                    handler = handlers[key] || handleUnknown;
                    return [4 /*yield*/, handler({ channel_id: channel_id, client: client, say: say, user_id: user_id })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    captureException(error_1);
                    channel_id = command.channel_id, user_id = command.user_id;
                    handleError({ channel_id: channel_id, client: client, error: error_1, user_id: user_id });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleCommand = handleCommand;
