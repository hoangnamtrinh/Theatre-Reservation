var express = require('express');
var router = express.Router();

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
  console.log(req.body);
  // res.send(req.body);
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
        connection.query(query, [1, s, req.body.showtime_id], function(err, rows, fields) {
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


// router.post('/addactor', function(req, res, next) {
//   //Connect to the database
//   req.pool.getConnection( function(err,connection) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//     var query = "INSERT INTO actor (first_name, last_name) VALUES (?, ?)";
//     connection.query(query, [req.body.first_name, req.body.last_name], function(err, rows, fields) {
//       connection.release(); // release connection
//       if (err) {
//         res.sendStatus(500);
//         return;
//       }
//       res.sendStatus(200); //send response
//     });
//   });
// });

module.exports = router;
