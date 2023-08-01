const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',      
  password: '' 
});


const databaseName = 'pruebatecnica';
const tableName = 'proyecto';

const csvFilePath = './data.csv'; 

connection.connect((err) => {
  if (err) {
    console.error('Error al conectarse a MySQL:', err);
    throw err;
  }

  
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName};`;

  connection.query(createDatabaseQuery, (err, result) => {
    if (err) {
      console.error('Error al crear la base de datos:', err);
      throw err;
    }

    console.log(`Base de datos "${databaseName}" creada correctamente`);

    
    const useDatabaseQuery = `USE ${databaseName};`;
    connection.query(useDatabaseQuery, (err, result) => {
      if (err) {
        console.error('Error al usar la base de datos:', err);
        throw err;
      }

      
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          system_id INT AUTO_INCREMENT PRIMARY KEY,
          system_name VARCHAR(255),
          location VARCHAR(255),
          inverter_brand VARCHAR(255),
          panel_brand VARCHAR(255),
          panel_power INT,
          panel_quantity INT, 
          installed_power INT,
          current_generation INT,
          total_generation INT
        );
      `;

      connection.query(createTableQuery, (err, result) => {
        if (err) {
          console.error('Error al crear la tabla:', err);
          throw err;
        }

        console.log('Tabla creada correctamente');

      
        fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on('data', (data) => {
            const insertQuery = `INSERT INTO ${tableName} (system_name, location, inverter_brand, panel_brand, panel_power, panel_quantity, installed_power, current_generation, total_generation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
              data.system_name,
              data.location,
              data.inverter_brand,
              data.panel_brand,
              data.panel_power,
              data.panel_quantity,
              data.installed_power,
              data.current_generation,
              data.total_generation
            ];

            connection.query(insertQuery, values, (err, result) => {
              if (err) {
                console.error('Error al insertar datos:', err);
              } else {
                console.log('Datos insertados correctamente');
              }
            });
          })
          .on('end', () => {
            connection.end();
          });
      });
    });
  });
});
