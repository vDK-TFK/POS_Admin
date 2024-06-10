const express = require('express');
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

const app = express();

app.get('/backups', (req, res) => {
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;
    const backupPath = process.env.BACKUP_PATH;
    const fileName = `${database}-backup.sql`;
    const filePath = path.join(backupPath, fileName);

    const command = `mysqldump -u ${user} -p${password} ${database} > ${filePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al generar el respaldo: ${error.message}`);
            return res.status(500).send('Error al generar el respaldo');
        }
        
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error(`Error al descargar el respaldo: ${err.message}`);
                return res.status(500).send('Error al descargar el respaldo');
            }

        });
    });
});

app.listen(3001, () => {
    console.log('Server run on port 3001');
});
