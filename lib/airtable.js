const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyB2lKqkg5ggzwFV'}).base('appcTx3pSewaPbU29');

const table = base('coffee-stores');

const getMinifiedRecord = (record) => {
    return {
        ...record.fields
    }
}

const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record))
}

export {
    table,
    getMinifiedRecords
}