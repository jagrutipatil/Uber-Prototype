var shortId = require('shortid');

// @param {Object} app - express app instance
module.exports = function(app) {  
  // get the gridfs instance
  var gridfs = app.get('gridfs');

  return {
    upload: function(req, res, next) {
      var is;
      var os;
      //get the extenstion of the file
      var extension = req.files.file.path.split(/[. ]+/).pop();
      is = fs.createReadStream(req.files.file.path);
      os = gridfs.createWriteStream({ filename: shortId.generate()+'.'+extension });
      is.pipe(os);

      os.on('close', function (file) {
        //delete file from temp folder
        fs.unlink(req.files.file.path, function() {
          res.json(200, file);
        });
      });
    } 
  };
};