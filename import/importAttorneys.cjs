var exec = require('child_process').exec;

const importAttorneys = async () => {
    exec('sanity dataset import ./export/exports/attorneys.ndjson production --replace' ,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });    
}

importAttorneys();

exports.importAttorneys = importAttorneys