var exec = require('child_process').exec;

const importPracticeAreas = async () => {
    exec('sanity dataset import ./export/exports/practice-areas.ndjson production --replace' ,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });    
}

importPracticeAreas();

exports.importPracticeAreas = importPracticeAreas