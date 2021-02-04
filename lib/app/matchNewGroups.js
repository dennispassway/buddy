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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchNewGroups = void 0;
var database_1 = require("app/database");
var constants_1 = require("app/constants");
var utils_1 = require("app/utils");
var translate_1 = require("app/translate");
var timesTriedToCreateNewGroup = 0;
function matchNewGroups(client) {
    return __awaiter(this, void 0, void 0, function () {
        var settings, buddyGroupSize, usersToIgnore, latestGroups, activeMembers, groups, groupsWithChannels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.getSettings()];
                case 1:
                    settings = _a.sent();
                    buddyGroupSize = settings[constants_1.SETTING_BUDDY_GROUP_SIZE] || constants_1.DEFAULT_SETTINGS[constants_1.SETTING_BUDDY_GROUP_SIZE];
                    usersToIgnore = settings[constants_1.SETTING_USERS_TO_IGNORE] || constants_1.DEFAULT_SETTINGS[constants_1.SETTING_USERS_TO_IGNORE];
                    return [4 /*yield*/, database_1.getLatestGroups(constants_1.LATEST_GROUPS_AMOUNT)];
                case 2:
                    latestGroups = _a.sent();
                    return [4 /*yield*/, fetchActiveMembers({ client: client, usersToIgnore: usersToIgnore })];
                case 3:
                    activeMembers = _a.sent();
                    return [4 /*yield*/, createGroupsForMembers(activeMembers, latestGroups, buddyGroupSize)];
                case 4:
                    groups = _a.sent();
                    return [4 /*yield*/, openChannelsForGroups({ client: client, groups: groups })];
                case 5:
                    groupsWithChannels = _a.sent();
                    console.log("New Channels opened for groups.");
                    // Save groups to database.
                    return [4 /*yield*/, database_1.addGroupsToDatabase(new Date().toUTCString(), groupsWithChannels)];
                case 6:
                    // Save groups to database.
                    _a.sent();
                    console.log(groups.length + " groups saved to database.");
                    // Notify everyone of their new group
                    return [4 /*yield*/, Promise.all(groupsWithChannels.map(function (_a) {
                            var channel = _a.channel, members = _a.members;
                            return welcomeMembersToGroup({ channel: channel, client: client, members: members });
                        }))];
                case 7:
                    // Notify everyone of their new group
                    _a.sent();
                    // Done
                    console.log(groups.length + " new groups notified.");
                    return [2 /*return*/];
            }
        });
    });
}
exports.matchNewGroups = matchNewGroups;
function openChannelsForGroups(_a) {
    var client = _a.client, groups = _a.groups;
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all(groups.map(function (group) { return __awaiter(_this, void 0, void 0, function () {
                        var channel;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, client.conversations.open({
                                        token: process.env.SLACK_BOT_TOKEN,
                                        users: group.join(','),
                                    })];
                                case 1:
                                    channel = (_a.sent()).channel;
                                    return [2 /*return*/, { members: group, channel: channel.id }];
                            }
                        });
                    }); }))];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function welcomeMembersToGroup(_a) {
    var channel = _a.channel, client = _a.client, members = _a.members;
    return __awaiter(this, void 0, void 0, function () {
        var buddiesString, text;
        return __generator(this, function (_b) {
            if (process.env.DISABLE_USER_NOTIFICATION === 'true') {
                console.log("Users not notified, DISABLE_USER_NOTIFICATION is enabled.");
                return [2 /*return*/, Promise.resolve()];
            }
            buddiesString = members.map(function (buddy) { return "<@" + buddy + ">"; }).join(', ');
            text = utils_1.randomFromArray(translate_1.translate(GREETINGS)) + " " + buddiesString + ". " + translate_1.translate(YOU_ARE_BUDDIES_FOR) + " " + translate_1.translate(WEEK) + "! :tada:";
            return [2 /*return*/, client.chat.postMessage({
                    channel: channel,
                    token: process.env.SLACK_BOT_TOKEN,
                    text: text,
                })];
        });
    });
}
function fetchActiveMembers(_a) {
    var client = _a.client, usersToIgnore = _a.usersToIgnore;
    return __awaiter(this, void 0, void 0, function () {
        var members;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, client.users.list({
                        token: process.env.SLACK_BOT_TOKEN,
                    })];
                case 1:
                    members = (_b.sent()).members;
                    return [2 /*return*/, members
                            .filter(function (_a) {
                            var deleted = _a.deleted, is_bot = _a.is_bot, id = _a.id;
                            return !deleted && !is_bot && id !== 'USLACKBOT' && usersToIgnore.indexOf(id) === -1;
                        })
                            .map(function (_a) {
                            var id = _a.id;
                            return id;
                        })];
            }
        });
    });
}
function createGroupsForMembers(members, latestGroups, buddyGroupSize) {
    return __awaiter(this, void 0, void 0, function () {
        var newGroups, shuffledMembers, isEven, sortedGroups, sortedLatestGroupMembers_1, alreadyCreatedGroups;
        return __generator(this, function (_a) {
            newGroups = null;
            shuffledMembers = utils_1.shuffleArray(members);
            isEven = shuffledMembers.length % 2 === 0;
            newGroups = shuffledMembers.reduce(function (acc, cur, index, source) {
                var items = __spreadArrays(acc);
                var lastItem = items[items.length - 1] || [];
                if (!lastItem.length) {
                    items.push(lastItem);
                }
                var isFinalMember = index === source.length - 1;
                if (lastItem.length < buddyGroupSize || (!isEven && isFinalMember)) {
                    lastItem.push(cur);
                }
                else {
                    items.push([cur]);
                }
                return items;
            }, []);
            if (latestGroups) {
                sortedGroups = __spreadArrays(newGroups.map(function (group) { return group.sort().join(','); }));
                sortedLatestGroupMembers_1 = latestGroups.map(function (_a) {
                    var members = _a.members;
                    return members.sort().join(',');
                });
                alreadyCreatedGroups = sortedGroups.filter(function (group) { return sortedLatestGroupMembers_1.indexOf(group) !== -1; });
                if (alreadyCreatedGroups.length && timesTriedToCreateNewGroup < constants_1.MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP) {
                    timesTriedToCreateNewGroup++;
                    return [2 /*return*/, createGroupsForMembers(members, latestGroups, buddyGroupSize)];
                }
            }
            if (timesTriedToCreateNewGroup >= constants_1.MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP) {
                console.warn("Could not fine a unique group after " + constants_1.MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP + " tries.");
            }
            console.log("Created new groups after " + timesTriedToCreateNewGroup + "/" + constants_1.MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP + " tries to be unique.");
            timesTriedToCreateNewGroup = 0;
            return [2 /*return*/, newGroups];
        });
    });
}
