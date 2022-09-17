"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
function Upload(req, res) {
    const response = req.files.map(item => {
        return { name: item.fieldname, description: item.destination, url: item.filename, path: item.filename };
    });
    console.log(response);
    res.json(response);
}
exports.Upload = Upload;
