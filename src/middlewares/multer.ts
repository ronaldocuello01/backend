const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');


const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        file.finalFilename = file.fieldname + '_' +  uuidv4() + path.extname(file.originalname).toLocaleLowerCase();
        cb(null, file.finalFilename);
    },
    destination: path.join(__dirname, '../files'),
});


// const m = multer({storage})

// module.exports = m;

export default multer({storage})
