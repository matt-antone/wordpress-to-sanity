var exec = require('child_process').exec;

const importCategories = async () => {
    exec('sanity dataset import ./export/exports/categories.ndjson production --replace' ,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });    
}

importCategories();

exports.importCategories = importCategories