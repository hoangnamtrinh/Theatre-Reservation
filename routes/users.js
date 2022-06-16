var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile('home.html');
});

const plays = [{ID: 1, Image: "https://www.target.com.au/medias/static_content/product/images/full/59/54/A1115954.jpg?impolicy=product_portrait_hero", Name: "HP"},
{ID: 2, Image: "https://m.media-amazon.com/images/I/51dHnZJcZ2L._AC_SY580_.jpg", Name: "BB"}];
router.get('/getplays', function(req, res, next) {
  res.json(plays);
});

router.get('/getplay/:id', function(req, res, next) {
  res.json(plays[req.params.id]);
});

router.get('/play/:id', function(req, res, next) {
  // var film_id = res.params.id;
  res.send("all");
  // res.sendFile('film.html');
});

var dates = ['a', 'b'];
router.get('/getdate', function(req, res, next) {
  // var film_id = res.params.id;
  res.json(dates);
  // res.sendFile('film.html');
});

var times = ['a', 'b'];
router.get('/gettime', function(req, res, next) {
  // var film_id = res.params.id;
  res.json(times);
  // res.sendFile('film.html');
});

var seats = [];
router.post('/addseats', function(req, res, next) {
  seats = req.body.bookedSeats;
  // console.log(seats);
  res.send(req.body);
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
