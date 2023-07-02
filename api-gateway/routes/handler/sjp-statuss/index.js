const create = require('./create');
const getAll = require('./getAll');
const exportData = require('./export');
const downloadImage = require('./download');
const getSjpStatus = require('./getSjpStatus');
const destroy = require('./destroy');
const update = require('./update');

module.exports = {
    create,
    getAll,
    exportData,
    getSjpStatus,
    destroy,
    update,
    downloadImage,
}