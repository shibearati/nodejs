const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname, 'target', 'my-app-1.0-SNAPSHOT.war'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('WAR file has been created successfully.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Append files from a sub-directory, putting its contents at the root of archive
archive.directory('src/', false);

// Finalize the archive (i.e. we are done appending files but streams have to finish yet)
archive.finalize();
