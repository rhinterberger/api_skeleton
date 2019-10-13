import fs from 'fs';

// Read all files from ./models/sql and create queries object.

export default async () => {
    var queries={};

    let files = fs.readdirSync('./src/models/sql');

    for (let file of files)
    {
        let data = fs.readFileSync('./src/models/sql/' + file);
        queries[file.split('.')[0]]=data.toString();
    }

    return queries;
}