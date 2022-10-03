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
var _this = this;
var latex = require('node-latex');
var fs = require('fs');
var fsPromises = require('fs/promises');
var app = require('electron').app;
var path = require('path');
var getLetterLatex = require('./templates/letter_template');
var getCVLatex = require('./templates/template2');
/**
 * Function to generate and save pdf given latexString and id
 * @param {string} latexString
 * @param {number} id
 * @returns {Promise}
 */
var pdfGenerator = function (latexString, type, id) { return __awaiter(_this, void 0, void 0, function () {
    var latexPdf, error_1, pdfFiles, existingPdfFile, texFiles, existingTexFile, error_2, dateString, pdfFile, saveTexPath, texFile, returnArray, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, latex(latexString)];
            case 1:
                latexPdf = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3:
                _a.trys.push([3, 10, , 11]);
                return [4 /*yield*/, fsPromises.readdir(path.join(app.getPath('userData'), "output_files/".concat(type, "_pdf")))];
            case 4:
                pdfFiles = _a.sent();
                existingPdfFile = pdfFiles.find(function (file) {
                    var pattern = new RegExp(type + '_' + id);
                    return pattern.test(file);
                });
                if (!(existingPdfFile !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, fsPromises.unlink(path.join(app.getPath('userData'), "output_files/".concat(type, "_pdf"), existingPdfFile))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, fsPromises.readdir(path.join(app.getPath('userData'), "output_files/".concat(type, "_tex")))];
            case 7:
                texFiles = _a.sent();
                existingTexFile = texFiles.find(function (file) {
                    var pattern = new RegExp(type + '_' + id);
                    return pattern.test(file);
                });
                if (!(existingTexFile !== undefined)) return [3 /*break*/, 9];
                return [4 /*yield*/, fsPromises.unlink(path.join(app.getPath('userData'), "output_files/".concat(type, "_tex"), existingTexFile))];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_2 = _a.sent();
                throw error_2;
            case 11:
                dateString = new Date().toISOString().split(/[:.-]/).join('_');
                pdfFile = new Promise(function (resolve, reject) {
                    var savePdfPath = path.join(app.getPath('userData'), "output_files/".concat(type, "_pdf"), "".concat(type, "_").concat(id, "_").concat(dateString, ".pdf"));
                    var output = fs.createWriteStream(savePdfPath);
                    latexPdf.pipe(output);
                    latexPdf.on('error', function (err) { return reject(err); });
                    latexPdf.on('finish', function () {
                        return resolve("\\output_files\\".concat(type, "_pdf\\").concat(type, "_").concat(id, "_").concat(dateString, ".pdf"));
                    });
                });
                saveTexPath = path.join(app.getPath('userData'), "output_files/".concat(type, "_tex"), "".concat(type, "_").concat(id, "_").concat(dateString, ".tex"));
                texFile = fsPromises.writeFile(saveTexPath, latexString);
                _a.label = 12;
            case 12:
                _a.trys.push([12, 14, , 15]);
                return [4 /*yield*/, Promise.all([pdfFile, texFile])];
            case 13:
                returnArray = _a.sent();
                return [2 /*return*/, returnArray[0]];
            case 14:
                error_3 = _a.sent();
                throw error_3;
            case 15: return [2 /*return*/];
        }
    });
}); };
var pdfGeneratorHandler = function (event, type, args) { return __awaiter(_this, void 0, void 0, function () {
    var latexString;
    return __generator(this, function (_a) {
        if (type === 'cv') {
            latexString = getCVLatex(args.detailsObject);
        }
        else if (type === 'letter') {
            latexString = getLetterLatex(args.detailsObject);
        }
        return [2 /*return*/, pdfGenerator(latexString, type, args.id)];
    });
}); };
module.exports = pdfGeneratorHandler;
//# sourceMappingURL=pdfGenerator.js.map