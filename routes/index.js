var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + "./public/login.html");
});

router.get('/login', function(req, res, next) {
  res.sendFile("login.html");
});

router.post('/login', function(req, res, next) {
  if ('username' in req.body && 'password' in req.body) {
    // Connect to the database
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var query = "SELECT * FROM Customer WHERE Username = ? AND Password = UNHEX(SHA2(CONCAT('SA', ?, 'LT'), 256));";
      connection.query(query, [req.body.username, req.body.password], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          res.sendStatus(500);
          return;
        }

        if (rows.length > 0) {
          req.session.user = rows[0];
          res.json(rows[0]); //send response
        } else {
          res.sendStatus(401);
        }
      });
    });
  }
});

router.get('/signup', function(req, res, next) {
  res.sendFile("signup.html");
});

router.post('/signup', function(req, res, next) {
  if ('username' in req.body && 'password' in req.body) {
    // Connect to the database
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var query = "INSERT INTO Customer (Username, Password) VALUES (?, UNHEX(SHA2(CONCAT('SA', ?, 'LT'), 256)));";
      connection.query(query, [req.body.username, req.body.password], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          console.log(err);
          res.sendStatus(500).send(err);
          return;
        }
        res.sendStatus(200);
      });
    });
  }
})

module.exports = router;
