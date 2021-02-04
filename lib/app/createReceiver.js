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
exports.createReceiver = void 0;
var SETTING_REGENERATE = require("./constants").SETTING_REGENERATE;
var ExpressReceiver = require("@slack/bolt").ExpressReceiver;
var _a = require("@slack/bolt/dist/ExpressReceiver"), respondToSslCheck = _a.respondToSslCheck, respondToUrlVerification = _a.respondToUrlVerification;
var createReceiver = function (signingSecret) {
    var receiver = new ExpressReceiver({
        signingSecret: signingSecret,
    });
    // Disable start and stop to prevent it starting an express server
    receiver.start = function () { };
    receiver.stop = function () { };
    receiver.handleRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var ackCalled, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ackCalled = false;
                    if (req.body && req.body.ssl_check) {
                        return [2 /*return*/, respondToSslCheck(req, res)];
                    }
                    if (req.body && req.body.type && req.body.type === "url_verification") {
                        return [2 /*return*/, respondToUrlVerification(req, res)];
                    }
                    if (req.body.payload) {
                        req.body = JSON.parse(req.body.payload);
                    }
                    event = {
                        body: req.body || {},
                        ack: function (response) {
                            if (ackCalled) {
                                return;
                            }
                            ackCalled = true;
                            var _a = req.body || {}, actions = _a.actions, event = _a.event;
                            var isMessage = (event || {}).type === "message";
                            var isRegenerateAction = actions &&
                                actions.length &&
                                actions.findIndex(function (_a) {
                                    var action_id = _a.action_id;
                                    return action_id === SETTING_REGENERATE;
                                }) !== -1;
                            var timeout = isMessage || isRegenerateAction ? 5000 : 1500;
                            /*
                              Some action take longer than Slack accepts so the response is in a
                              timeout to prevent the http connection from closing before the action
                              is done. This could result in operation_timed_out messages.
                            */
                            setTimeout(function () {
                                if (response instanceof Error) {
                                    res.status(500).send();
                                }
                                else if (!response) {
                                    res.status(200).send("");
                                }
                                else {
                                    res.status(200).send(response);
                                }
                            }, timeout);
                        },
                    };
                    return [4 /*yield*/, receiver.bolt.processEvent(event)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return receiver;
};
exports.createReceiver = createReceiver;
