'use strict';
const fs = require('fs');
const db = require('mariasql');
const async = require('async');
const ejs = require('ejs');

const c = new db({
  host: "localhost",
  user: '',
  password: '',
  db: ''
});

const promisedQuery = (client, query) => {
  return new Promise((resolve, reject) => {
    client.query(query, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
}

let models = [];
let tmp = {};

promisedQuery(c, "SHOW FULL TABLES;").then((rows) => { 

  async.eachSeries(rows.filter(table => table.Table_type === 'BASE TABLE'), (row, cb) => {

    tmp = {};
    tmp.name = row.Tables_in_PREMIX;
    tmp.table = row.Tables_in_PREMIX;
    tmp.name_field = "";
    promisedQuery(c, `DESCRIBE ${row.Tables_in_PREMIX};`).then((description) => {

      tmp.prop = [];
      async.eachSeries(description, (desc, descb) => {

        if (desc.Key === 'PRI') tmp.id_field = desc.Field;
        tmp.prop.push(desc.Field);
        return descb();

      }, err => {
        if (err) return cb(err);
        models.push(Object.assign({}, tmp) );
        return cb(null);
      });

    }).catch(err => { 
      return cb(err); 
    });

  }, err => {
    if (err) {
      console.log(err);
    }else{
      console.log(ejs.render(fs.readFileSync('php_sparrow_template.ejs', {encoding: 'utf-8'}), {models: models}));
    }
    c.end();
  });

}).catch(err => { 
  console.error(err); 
  c.end();
});
