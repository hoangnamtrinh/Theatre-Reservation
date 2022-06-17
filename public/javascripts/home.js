// var vueinst = new Vue({
//   el: '#app',
//   data: {
//     appHidden: False,
//     link: "",
//     plays: [],
//   },
//   mounted:function() {
//     this.getPlays()
//   },
//   methods: {
//       // addPost: function(events) {
//       //     var xhttp = new XMLHttpRequest();
//       //     xhttp.onreadystatechange = function() {
//       //     if (this.readyState == 4 && this.status == 200) {
//       //     }
//       //     };
//       //     xhttp.open("POST", "users/addpost", true);
//       //     xhttp.setRequestHeader("Content-type", "application/json");
//       //     xhttp.send(JSON.stringify({ title: vueinst.title, content: vueinst.content }));
//       // },
//     getPlays: function(events) {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             vueinst.plays = JSON.parse(this.responseText);
//         }
//         };
//         xhttp.open("GET", "users/getplays", true);
//         xhttp.send();
//     },
//   },
// });

// function getPlay(id) {
//     console.log(id);
//     window.location.href = ('/users/play/' + String(id));
// }

var vueinst1 = new Vue({
  el: '#main',
  data: {
    show_reservation: true,
    link: "",
    play_id: 0,
    plays: [],
    play: [],
    date: "",
    time: "",
    dates: [],
    times: [],
    oseats: [],
    showtime_id: 0,
    showSeats: false,
    checkedSections: [],
    filterSections: [true, true, true, true, true],
    sections: ['A', 'B', 'C', 'D', 'E'],
    // bookedSeats: [],
  },
  mounted:function() {
    // this.getPlay(),
    // this.getDate(),
    this.getPlays()
  },
  methods: {
    getPlays: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst1.plays = JSON.parse(this.responseText);
      }
      };
      xhttp.open("GET", "users/getplays", true);
      xhttp.send();
    },
    getPlay: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst1.play = JSON.parse(this.responseText)[0];
          // console.log(vueinst1.play[0].Image);
      }
      };
      xhttp.open("POST", "users/getplay", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({ play_id: vueinst1.play_id }));
  },
    getDate: function(events) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vueinst1.dates = JSON.parse(this.responseText);
            // console.log(vueinst1.dates)
        }
        };
        xhttp.open("POST", "users/getdate", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ play_id: vueinst1.play_id }));
    },
    getTime: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst1.times = JSON.parse(this.responseText);
      }
      };
      xhttp.open("POST", "users/gettime", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({ play_id: vueinst1.play_id, date: vueinst1.date }));
    },
    getOccupiedSeats: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst1.oseats = JSON.parse(this.responseText);
          console.log(vueinst1.oseats);
      }
      };
      xhttp.open("POST", "users/getoccupiedseats", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({ play_id: vueinst1.play_id, date: vueinst1.date, time: vueinst1.time }));
    },
    changeOSeats: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst1.oseats = JSON.parse(this.responseText);
          console.log(vueinst1.oseats);
          for (let i = 0; i < vueinst1.oseats.length; i++) {
            let seat_id = vueinst1.oseats[i].Seat_ID;
            let oseat = document.getElementById(seat_id);
            oseat.className += " occupied";

            vueinst1.showtime_id = vueinst1.oseats[i].showtime_id;
          }
      }
      };
      xhttp.open("POST", "users/getoccupiedseats", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({ play_id: vueinst1.play_id, date: vueinst1.date, time: vueinst1.time }));
    },
    // addSeats: function(events) {
    //   if (bookedSeats.length > 0) {
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //           // res.send()
    //         }
    //     }
    //     };
    //     xhttp.open("POST", "users/addseats", true);
    //     xhttp.setRequestHeader("Content-type", "application/json");
    //     xhttp.send(JSON.stringify({ play_id: vueinst1.play_id, date: vueinst1.date, time: vueinst1.time, bookedSeats: bookedSeats }));
    //   } else {
    //     alert
    //   }

    // },
    filter: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst1.filterSections = JSON.parse(this.responseText);
      }
      };
      xhttp.open("POST", "users/filter", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({ sections: vueinst1.checkedSections }));
    },
  },
});

var bookedSeats = [];
function resetBookedSeats() {
  for (let seat_id of bookedSeats) {
    var seat = document.getElementById(seat_id);
    seat.className = "seat";
  }
  bookedSeats = [];
}
function bookSeat(seat_id) {
  var seat = document.getElementById(seat_id);
  if (!seat.classList.contains('occupied')) {
    if (!seat.classList.contains('selected')) {
      bookedSeats.push(seat_id);
      seat.className += " selected";
    } else {
      //remove seat from bookedSeats
      const index = bookedSeats.indexOf(seat_id);
      if (index > -1) {
        bookedSeats.splice(index, 1); // 2nd parameter means remove one item only
      }
      //turn to normal color
      seat.className = "seat";
    }
    console.log(bookedSeats);
  }
}

function addSeats() {
  if (bookedSeats.length > 0) {
    let date = document.getElementById("adddate").innerText;
    let time = document.getElementById("addtime").innerText;
    let play_id = document.getElementById("addplayid").innerText;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    }
    };
    xhttp.open("POST", "users/addseats", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({play_id: play_id, date: date, time: time, bookedSeats: bookedSeats}));

  } else {
    alert("Please choose a seat");
  }
}

// var oseats = vueinst1.oseats;
// function changeOSeats() {
//   console.log(vueinst1.oseats.Seat_ID);
//   for (let i = 0; i < vueinst1.oseats.length; i++) {
//     var seat_id = vueinst1.oseats[i].id;
//     console.log(seat_id)
//     var oseat = document.getElementById(seat_id);
//     oseat.className = "seat occupied";
//   }
// }