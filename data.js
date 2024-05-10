const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hetal@333',
  database: 'cart'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to fetch data from MySQL and generate HTML table
app.get('/', (req, res) => {
  // Query to select data from your_table
   connection.query('SELECT * FROM ship', (err, results) => {
   // connection.query('SELECT * FROM shipping ORDER BY name1 DESC', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return;
    }

    // Create HTML table dynamically based on retrieved data
    let html = '<!DOCTYPE html>';
    html += '<html lang="en">';
    html += '<head><meta charset="UTF-8"><title>Data from MySQL</title>';
    html += '<style>table {border-collapse: collapse;width: 100%;} th, td {border: 1px solid black;padding: 8px;text-align: left;} th {background-color: #f2f2f2;}</style>';
    html += '</head>';
    html += '<body><h1>Data from CART PAGE (MySQL Table)</h1>';
    html += '<table><thead><tr>';
    // Add table headers
    for (const column in results[0]) {
      html += `<th>${column}</th>`;
    }
    html += '</tr></thead><tbody>';
    // Add table data
    results.forEach(row => {
      html += '<tr>';
      for (const column in row) {
        html += `<td>${row[column]}</td>`;
      }
      html += '</tr>';
    });
    html += '</tbody></table></body></html>';

    // Send the generated HTML as a response
    res.send(html);
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
