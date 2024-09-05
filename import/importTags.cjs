var exec = require('child_process').exec;

const importTags = async () => {
    exec('sanity dataset import ./export/exports/tags.ndjson production --replace' ,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });    
}

importTags();

exports.importTags = importTags