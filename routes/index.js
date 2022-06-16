var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

        if (rows[0].length > 0) {
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
  if ('username' in req.body && 'email' in req.body && 'password' in req.body) {
    // Connect to the database
    req.pool.getConnection(function(err, connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var query = "CALL sign_up(?, ?, ?)";
      connection.query(query, [req.body.username, req.body.email, req.body.password], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        if (rows[0].length > 0) {
          req.session.user = rows[0];
          console.log('login success');
          console.log(req.session.user);
          res.json(rows[0]); //send response
        } else {
          console.log('login bad');
          res.sendStatus(401);
        }
      });
    });
  }
})

module.exports = router;
