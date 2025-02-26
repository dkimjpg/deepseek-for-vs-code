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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var ollama_1 = require("ollama");
//const vscode = require('vscode');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/*@param {vscode.ExtensionContext} context
 */
function activate(context) {
    var _this = this;
    var disposable = vscode.commands.registerCommand('deepseek-for-vs-code.start', function () {
        var panel = vscode.window.createWebviewPanel('deepChat', 'Deep Seek Chat', vscode.ViewColumn.One, { enableScripts: true });
        panel.webview.html = getWebviewContent();
        panel.webview.onDidReceiveMessage(function (message) { return __awaiter(_this, void 0, void 0, function () {
            var userPrompt, responseText, streamResponse, _a, streamResponse_1, streamResponse_1_1, part, e_1_1, err_1;
            var _b, e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(message.command === 'chat')) return [3 /*break*/, 16];
                        userPrompt = message.text;
                        responseText = '';
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 15, , 16]);
                        return [4 /*yield*/, ollama_1.default.chat({
                                model: 'deepseek-r1:7b',
                                messages: [{ role: 'user', content: userPrompt }],
                                stream: true
                            })];
                    case 2:
                        streamResponse = _e.sent();
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 8, 9, 14]);
                        _a = true, streamResponse_1 = __asyncValues(streamResponse);
                        _e.label = 4;
                    case 4: return [4 /*yield*/, streamResponse_1.next()];
                    case 5:
                        if (!(streamResponse_1_1 = _e.sent(), _b = streamResponse_1_1.done, !_b)) return [3 /*break*/, 7];
                        _d = streamResponse_1_1.value;
                        _a = false;
                        part = _d;
                        responseText += part.message.content;
                        panel.webview.postMessage({ command: 'chatResponse', text: responseText });
                        _e.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _e.trys.push([9, , 12, 13]);
                        if (!(!_a && !_b && (_c = streamResponse_1.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _c.call(streamResponse_1)];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        err_1 = _e.sent();
                        panel.webview.postMessage({ command: 'chatResponse', text: "Error: ".concat(String(err_1)) });
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        }); });
    });
    context.subscriptions.push(disposable);
}
function getWebviewContent() {
    return /*html*/ "        \n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\" />\n            <style>\n                body { font-family: sans-serif; margin: 1rem; }\n                #prompt { width: 100%; box-sizing: border-box; }\n                #response { border: 1px solid #ccc; margin-top: 1rem; padding: 0.5rem;}\n            </style>\n        </head>\n        <body>\n            <h2>Deep VS Code Extension</h2>\n            <textarea id=\"prompt\" rows=\"3\" placeholder=\"Ask Deepseek...\"></textarea><br />\n            <button id=\"askBtn\">Ask</button>\n            <div id=\"response\"></div>\n            <script>\n                const vscode = acquireVsCodeApi();\n\n                document.getElementById('askBtn').addEventListener('click', () => {\n                    const text = document.getElementById('prompt').value;\n                    vscode.postMessage({ command: 'chat', text});\n                });\n\n                window.addEventListener('message', event => {\n                    const { command, text } = event.data;\n                    if (command === 'chatResponse') {\n                        document.getElementById('response').innerText = text;\n                    }\n                });\n\n            </script>\n        </body>\n        </html>\n        ";
}
// This method is called when your extension is deactivated
function deactivate() { }
