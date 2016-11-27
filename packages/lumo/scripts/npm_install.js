var https = require('https');
var fs = require('fs');
var zlib = require('zlib');
var JSZip = require('jszip');
var ProgressBar = require('progress');

var platform2release = {
  darwin: 'mac',
  linux: 'linux64',
  win32: 'win64',
};

var isWindows = process.platform === 'win32';
var platformZip = 'lumo_' + platform2release[process.platform] + '.zip';
var version = process.env.npm_package_version;
var file = fs.createWriteStream(platformZip);
var executable = isWindows ? 'lumo.exe' : 'lumo';

if (version == null) {
  throw new Error('Aborting! $npm_package_version not defined in env.')
}

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

function hookProgressBar(response) {
  var len = parseInt(response.headers['content-length'], 10);
  console.log(/* just newline */)
  var bar = new ProgressBar(' Downloading [:bar] :rate/bps :percent :etas', {
    complete: '=',
    imcomplete: ' ',
    width: 40,
    total: len
  });
  response.on('data', function(chunk) {
    bar.tick(chunk.length);
  });
  response.on('end', function() {
    console.log(/* just newline */)
  });
}

var request = https.get(url, function(response) {
  if (response.statusCode >= 300 &&
      response.statusCode < 400 &&
      response.headers['location'] != null) {
    var location = response.headers['location'];

    var req = https.get(location, function(response) {
      response.pipe(file);
      hookProgressBar(response);
      response.on('end', function() {
        var fileContents = fs.readFileSync(platformZip);
        var zipped = new JSZip().load(fileContents).file(executable);

        try {
          fs.mkdirSync('bin');
        } catch(e) {
          if (e.code !== 'EEXIST') {
            throw e;
          }
        }

        fs.writeFileSync('./bin/' + executable, zipped.asBinary(), {
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
    hookProgressBar(response);
  }

});

request.on('error', handleError);
