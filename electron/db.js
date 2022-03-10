const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let db;

module.exports.connect = app => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(
      path.join(app.getPath("userData"), "password-manager.db"),
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      }
    );
  });
};

module.exports.createTable = () => {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, url TEXT)`,
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports.getAllAccounts = () => {
  return new Promise((res, rej) => {
    db.all(`SELECT * FROM accounts`, (err, rows) => {
      if (err) {
        rej(err.message);
      } else {
        res(rows);
      }
    });
  });
};

module.exports.add = data => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO accounts (name, email, password, url) VALUES (?, ?, ?, ?)`,
      [data.name, data.email, data.password, data.url],
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
