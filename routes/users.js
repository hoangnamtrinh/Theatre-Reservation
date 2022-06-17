var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile('home.html');
});

router.get('/getplays', function(req, res, next) {
  //Connect to the database
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Play";
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
  // res.json(plays);
});

router.post('/getplay', function(req, res, next) {
    //Connect to the database
    req.pool.getConnection( function(err,connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var query = "SELECT * FROM Play WHERE ID = ?";
      connection.query(query, [req.body.play_id], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.json(rows); //send response
      });
    });
    // res.json(plays);
});

router.get('/play/:id', function(req, res, next) {
  req.session.play_id = req.params.id;
  // res.redirect('/play.html');
  res.send();
});

// var dates = ['a', 'b'];
router.post('/getdate', function(req, res, next) {
  //Connect to the database
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Showtime WHERE Play_ID = ?";
    connection.query(query, [req.body.play_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
  // res.json(dates);
  // res.sendFile('/film.html');
});

// var times = ['a', 'b'];
router.post('/gettime', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Showtime WHERE Play_ID = ? AND Date= ?";
    connection.query(query, [req.body.play_id, req.body.date], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
  // res.json(times);
  // res.sendFile('film.html');
});

router.post('/addseats', function(req, res, next) {
  // console.log(req.body);
  if ('user' in req.session) {
    var user_id = req.session.user[0].ID;
    console.log(user_id);
    res.sendStatus(401);
  }
  if ('showtime_id' in req.body && 'bookedSeats' in req.body) {
    var bookedSeats = req.body.bookedSeats;
    for (let s of bookedSeats) {
      // Connect to the database
      req.pool.getConnection(function(err, connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = "INSERT INTO Reservation (Customer_ID, Seat_ID, Showtime_ID) VALUES (?, ?, ?);";
        connection.query(query, [user_id, s, req.body.showtime_id], function(err, rows, fields) {
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
  }
});

var sections = [];
router.post('/filter', function(req, res, next) {
  sections = req.body.sections;
  filters = [false, false, false, false, false];
  for (const s of sections) {
    if (s == 'A') {
      filters[0] = true;
    }
    if (s == 'B') {
      filters[1] = true;
    }
    if (s == 'C') {
      filters[2] = true;
    }
    if (s == 'D') {
      filters[3] = true;
    }
    if (s == 'E') {
      filters[4] = true;
    }
  }
  res.send(filters);
});

router.get('/getCustomer', function(req, res, next) {
  //Connect to the database
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Customer";
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
});

router.post('/getoccupiedseats', function(req, res, next) {
  //Connect to the database
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Reservation INNER JOIN Showtime ON Reservation.Showtime_ID = Showtime.ID WHERE Date = ? AND Time = ? AND Play_ID = ?";
    connection.query(query, [req.body.date, req.body.time, req.body.play_id,], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
});

router.get('/history', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'history.html'));
});

router.get('/getreservations', function(req, res, next) {
  //Connect to the database
  if ('user' in req.session) {
    var user_id = req.session.user[0].ID;
    console.log(user_id);
    res.sendStatus(401);
  }
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Reservation INNER JOIN Showtime ON Reservation.Showtime_ID = Showtime.ID INNER JOIN Customer ON Reservation.Customer_ID = Customer.ID INNER JOIN Play ON Play_ID = Play.ID WHERE Customer_ID = ?";
    connection.query(query, [user_id] function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
});



module.exports = router;
