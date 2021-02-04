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
exports.handleMessage = void 0;
var _a = require("./constants"), DEFAULT_SETTINGS = _a.DEFAULT_SETTINGS, REGENERATE_INTERVAL_IN_MILLISECONDS = _a.REGENERATE_INTERVAL_IN_MILLISECONDS, SETTING_DAY_TO_REGENERATE = _a.SETTING_DAY_TO_REGENERATE, SETTING_UTC_OFFSET = _a.SETTING_UTC_OFFSET;
var captureException = require("./sentry").captureException;
var _b = require("./database"), getLatestGroups = _b.getLatestGroups, getSettings = _b.getSettings;
var matchNewGroups = require("./matchNewGroups").matchNewGroups;
function handleMessage(_a) {
    var client = _a.client;
    return __awaiter(this, void 0, void 0, function () {
        var settings, dayToRegenerate, utcOffset, todayDate, groups, latestGroupCreation, latestGroupCreationDate, timeSinceLastCreation, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getSettings()];
                case 1:
                    settings = _b.sent();
                    dayToRegenerate = settings[SETTING_DAY_TO_REGENERATE] ||
                        DEFAULT_SETTINGS[SETTING_DAY_TO_REGENERATE];
                    utcOffset = settings[SETTING_UTC_OFFSET] || DEFAULT_SETTINGS[SETTING_UTC_OFFSET];
                    todayDate = getUTCDateAt9Am(null, utcOffset);
                    if (todayDate.getDay() !== dayToRegenerate) {
                        return [2 /*return*/]; // We're not on the regeneration day
                    }
                    return [4 /*yield*/, getLatestGroups()];
                case 2:
                    groups = _b.sent();
                    if (!groups.length) {
                        console.log("No groups available, regenerating.");
                        return [2 /*return*/, matchNewGroups(client)];
                    }
                    latestGroupCreation = groups[0].createdAt;
                    if (!latestGroupCreation) {
                        throw new Error("No latest group creation date available...");
                    }
                    latestGroupCreationDate = getUTCDateAt9Am(latestGroupCreation, utcOffset);
                    timeSinceLastCreation = todayDate.getTime() - latestGroupCreationDate.getTime();
                    if (timeSinceLastCreation >= REGENERATE_INTERVAL_IN_MILLISECONDS) {
                        return [2 /*return*/, matchNewGroups(client)];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    captureException(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.handleMessage = handleMessage;
function getUTCDateAt9Am(date, offset) {
    if (offset === void 0) { offset = 0; }
    var d = date ? new Date(date) : new Date();
    d.setUTCHours(9 + offset);
    d.setUTCMinutes(0);
    d.setUTCSeconds(0);
    d.setUTCMilliseconds(0);
    return d;
}
