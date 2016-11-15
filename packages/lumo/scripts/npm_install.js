var https = require('https');
var fs = require('fs');
var zlib = require('zlib');
var JSZip = require('jszip');

var platform2release = {
  darwin: 'mac',
  linux: 'linux64',
  win32: 'win64',
};

var platformZip = 'lumo_' + platform2release[process.platform] + '.zip';
var version = process.env.npm_package_version;
var file = fs.createWriteStream(platformZip);

var url = [
  'https://github.com/anmonteiro/lumo/releases/download',
  version,
  platformZip,
].join('/');

function handleError() {
  file.close();
  console.error('Download failed.');
  process.exit(-1);
}

var request = https.get(url, function(response) {
  if (response.statusCode >= 300 &&
      response.statusCode < 400 &&
      response.headers['location'] != null) {
    var location = response.headers['location'];

    var req = https.get(location, function(response) {
      response.pipe(file);
      response.on('end', function() {
        var fileContents = fs.readFileSync(platformZip);
        var zipped = new JSZip().load(fileContents).file('lumo');

        try {
          fs.mkdirSync('bin');
        } catch(e) {
          if (e.code !== 'EEXIST') {
            throw e;
          }
        }
        fs.writeFileSync('./bin/lumo', zipped.asBinary(), {
          encoding: 'binary',
          mode: zipped.options.unixPermissions,
        });
        fs.unlinkSync(platformZip);
      });
    });

    req.setTimeout(30000, handleError);

    req.on('error', handleError);
  } else {
    response.pipe(file);
  }
});

request.on('error', handleError);
