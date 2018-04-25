var request = require('request');
var fs = require('fs');
var zlib = require('zlib');
var yauzl = require('yauzl');
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
  throw new Error('Aborting! $npm_package_version not defined in env.');
}

var url = [
  'https://github.com/anmonteiro/lumo/releases/download',
  version,
  platformZip,
].join('/');

function hookProgressBar(req) {
  req.on('response', function(response) {
    console.log(/* just newline */);

    var len = parseInt(response.headers['content-length'], 10);
    var bar = new ProgressBar(' Downloading [:bar] :rate/bps :percent :etas', {
      complete: '=',
      imcomplete: ' ',
      width: 40,
      total: len,
    });

    response.on('data', function(chunk) {
      bar.tick(chunk.length);
    });

    response.on('end', function() {
      console.log(/* just newline */);
    });
  });
}

var req = request(url);

hookProgressBar(req);

req.pipe(file);

req.on('error', function(err) {
  file.close();
  console.error('\nDownload failed.');
  process.exit(-1);
});

req.on('end', function() {
  var fileContents = fs.readFileSync(platformZip);

  yauzl.open(platformZip, { lazyEntries: true }, function(err, zipfile) {
    if (err) {
      console.error('\nOpen', platformZip, 'failed.');
      process.exit(-2);
    }

    zipfile.readEntry();
    zipfile.on('entry', function(entry) {
      if (/\/$/.test(entry.fileName)) {
        zipfile.readEntry();
      } else if (executable == entry.fileName) {
        // file entry
        zipfile.openReadStream(entry, function(err, readStream) {
          if (err) {
            console.error('\nUnzip of', executable, 'failed.');
            process.exit(-3);
          }
          readStream.on('end', function() {
            zipfile.readEntry();
          });
          // make sure we create the bin folder
          try {
            fs.mkdirSync('bin');
          } catch (e) {
            if (e.code !== 'EEXIST') {
              throw e;
            }
          }
          // unzip the file with +x permissions
          var opts = {
            mode: 0o755,
            autoClose: true,
          };
          var writeStream = fs.createWriteStream('./bin/' + executable, opts);
          readStream.pipe(writeStream);
        });
      }
    });
  });

  fs.unlinkSync(platformZip);
});
