import fs from 'fs';
import path from 'path';

const filePath = path.join(path.resolve(), 'log.txt');

const logger = (req, res, next) => {
    const log = `${req.url} - ${req.method} - ${JSON.stringify(req.body)} - ${Date.now()}\n`;
    fs.appendFile(filePath, log, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
};

export default logger;