"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAppHome = void 0;
var _a = require('./constants'), DEFAULT_SETTINGS = _a.DEFAULT_SETTINGS, SETTING_ACTIVITIES_SUGGESTION_AMOUNT = _a.SETTING_ACTIVITIES_SUGGESTION_AMOUNT, SETTING_BUDDY_GROUP_SIZE = _a.SETTING_BUDDY_GROUP_SIZE, SETTING_DAY_TO_REGENERATE = _a.SETTING_DAY_TO_REGENERATE, SETTING_LANGUAGE = _a.SETTING_LANGUAGE, SETTING_REGENERATE = _a.SETTING_REGENERATE, SETTING_USERS_TO_IGNORE = _a.SETTING_USERS_TO_IGNORE, SETTING_UTC_OFFSET = _a.SETTING_UTC_OFFSET;
var _b = require('./translate'), CREATE_BUDDIES_SETTINGS = _b.CREATE_BUDDIES_SETTINGS, GENERAL_SETTINGS_TITLE = _b.GENERAL_SETTINGS_TITLE, GREETINGS = _b.GREETINGS, HOME_INTRO = _b.HOME_INTRO, REGROUP_BUDDIES_TITLE = _b.REGROUP_BUDDIES_TITLE, REGROUP_BUTTON_LABEL = _b.REGROUP_BUTTON_LABEL, SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION = _b.SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION, SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE = _b.SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE, SETTING_BUDDY_GROUP_SIZE_DESCRIPTION = _b.SETTING_BUDDY_GROUP_SIZE_DESCRIPTION, SETTING_BUDDY_GROUP_SIZE_TITLE = _b.SETTING_BUDDY_GROUP_SIZE_TITLE, SETTING_DAY_TO_REGENERATE_DESCRIPTION = _b.SETTING_DAY_TO_REGENERATE_DESCRIPTION, SETTING_DAY_TO_REGENERATE_TITLE = _b.SETTING_DAY_TO_REGENERATE_TITLE, SETTING_LANGUAGE_DESCRIPTION = _b.SETTING_LANGUAGE_DESCRIPTION, SETTING_LANGUAGE_TITLE = _b.SETTING_LANGUAGE_TITLE, SETTING_USERS_TO_IGNORE_DESCRIPTION = _b.SETTING_USERS_TO_IGNORE_DESCRIPTION, SETTING_USERS_TO_IGNORE_TITLE = _b.SETTING_USERS_TO_IGNORE_TITLE, SETTING_UTC_OFFSET_DESCRIPTION = _b.SETTING_UTC_OFFSET_DESCRIPTION, SETTING_UTC_OFFSET_TITLE = _b.SETTING_UTC_OFFSET_TITLE, translate = _b.translate;
var captureException = require('./sentry').captureException;
var getSettings = require('./database').getSettings;
var randomFromArray = require('./utils').randomFromArray;
function handleAppHome(_a) {
    var event = _a.event, client = _a.client;
    return __awaiter(this, void 0, void 0, function () {
        var blocks, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getBlocks({ event: event })];
                case 1:
                    blocks = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, client.views.publish({
                            user_id: event.user,
                            view: { type: 'home', blocks: blocks },
                        })];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    captureException(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.handleAppHome = handleAppHome;
function getBlocks(_a) {
    var event = _a.event;
    return __awaiter(this, void 0, void 0, function () {
        var settingsBlocks, adminUsers, isAdmin, settings, introBlocks;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    settingsBlocks = [];
                    adminUsers = (process.env.ADMIN_USERS || '').split(',');
                    isAdmin = adminUsers.indexOf(event.user) > -1;
                    if (!isAdmin) return [3 /*break*/, 2];
                    return [4 /*yield*/, getSettings()];
                case 1:
                    settings = _b.sent();
                    settingsBlocks = [
                        {
                            type: 'header',
                            text: { type: 'plain_text', text: translate(GENERAL_SETTINGS_TITLE) },
                        },
                        { type: 'divider' },
                        select({
                            action_id: SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
                            description: translate(SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION),
                            name: translate(SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE),
                            placeholder: 'Select an option',
                            settings: settings,
                            options: [1, 2, 3, 4, 5].map(function (v) { return ({
                                label: v.toString(),
                                value: v.toString(),
                            }); }),
                        }),
                        select({
                            action_id: SETTING_LANGUAGE,
                            description: translate(SETTING_LANGUAGE_DESCRIPTION),
                            name: translate(SETTING_LANGUAGE_TITLE),
                            placeholder: 'Select an option',
                            settings: settings,
                            options: [{ label: 'English', value: 'en' }],
                        }),
                        {
                            type: 'header',
                            text: { type: 'plain_text', text: translate(CREATE_BUDDIES_SETTINGS) },
                        },
                        { type: 'divider' },
                        select({
                            action_id: SETTING_BUDDY_GROUP_SIZE,
                            description: translate(SETTING_BUDDY_GROUP_SIZE_DESCRIPTION),
                            name: translate(SETTING_BUDDY_GROUP_SIZE_TITLE),
                            placeholder: 'Select an option',
                            settings: settings,
                            options: [1, 2, 3, 4, 5].map(function (v) { return ({
                                label: v.toString(),
                                value: v.toString(),
                            }); }),
                        }),
                        select({
                            action_id: SETTING_USERS_TO_IGNORE,
                            description: translate(SETTING_USERS_TO_IGNORE_DESCRIPTION),
                            name: translate(SETTING_USERS_TO_IGNORE_TITLE),
                            placeholder: 'Select users',
                            settings: settings,
                            type: 'multi_users_select',
                        }),
                        {
                            type: 'header',
                            text: { type: 'plain_text', text: translate(REGROUP_BUDDIES_TITLE) },
                        },
                        { type: 'divider' },
                        select({
                            action_id: SETTING_DAY_TO_REGENERATE,
                            description: translate(SETTING_DAY_TO_REGENERATE_DESCRIPTION),
                            name: translate(SETTING_DAY_TO_REGENERATE_TITLE),
                            placeholder: 'Select an option',
                            settings: settings,
                            options: [
                                { label: 'Monday', value: '1' },
                                { label: 'Tuesday', value: '2' },
                                { label: 'Wednesday', value: '3' },
                                { label: 'Thursday', value: '4' },
                                { label: 'Friday', value: '5' },
                                { label: 'Saturday', value: '6' },
                                { label: 'Sunday', value: '0' },
                            ],
                        }),
                        select({
                            action_id: SETTING_UTC_OFFSET,
                            description: translate(SETTING_UTC_OFFSET_DESCRIPTION),
                            name: translate(SETTING_UTC_OFFSET_TITLE),
                            placeholder: 'Select an option',
                            settings: settings,
                            options: [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (v) { return ({
                                label: "UTC " + (v > 0 ? '+' : '') + v.toString(),
                                value: v.toString(),
                            }); }),
                        }),
                        {
                            type: 'actions',
                            elements: [
                                {
                                    type: 'button',
                                    text: { type: 'plain_text', text: translate(REGROUP_BUTTON_LABEL) },
                                    action_id: SETTING_REGENERATE,
                                },
                            ],
                        },
                    ];
                    _b.label = 2;
                case 2:
                    introBlocks = [
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: "*" + randomFromArray(translate(GREETINGS)) + " <@" + event.user + ">! :wave:*",
                            },
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: translate(HOME_INTRO),
                            },
                        },
                    ];
                    return [2 /*return*/, !isAdmin ? introBlocks : __spreadArrays(introBlocks, settingsBlocks)];
            }
        });
    });
}
function select(_a) {
    var action_id = _a.action_id, description = _a.description, name = _a.name, options = _a.options, _b = _a.placeholder, placeholder = _b === void 0 ? '' : _b, settings = _a.settings, _c = _a.type, type = _c === void 0 ? 'static_select' : _c, rest = __rest(_a, ["action_id", "description", "name", "options", "placeholder", "settings", "type"]);
    var settingValue = settings[action_id] || DEFAULT_SETTINGS[action_id];
    var initial_option = (options || []).find(function (_a) {
        var value = _a.value;
        return value === settingValue.toString();
    });
    var initial_users = type === 'multi_users_select' ? (settingValue && settingValue !== '' ? settingValue : []) : null;
    return {
        type: 'section',
        text: { type: 'mrkdwn', text: "*" + name + "*\n" + description },
        accessory: __assign(__assign(__assign(__assign({ action_id: action_id,
            type: type, placeholder: { type: 'plain_text', text: placeholder } }, (initial_option ? { initial_option: createFromLabelValue(initial_option) } : {})), (initial_users ? { initial_users: initial_users } : {})), (options ? { options: options.map(createFromLabelValue) } : {})), rest),
    };
}
function createFromLabelValue(_a) {
    var label = _a.label, value = _a.value;
    return { text: { type: 'plain_text', text: label }, value: value };
}
