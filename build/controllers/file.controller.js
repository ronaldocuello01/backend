"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
function Upload(req, res) {
    console.log('file', req.file);
    const file = req.file;
    res.json(file);
}
exports.Upload = Upload;
