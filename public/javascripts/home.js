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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    }
    };
    xhttp.open("POST", "users/addseats", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ bookedSeats: bookedSeats }));

  } else {
    alert("Please choose a seat");
  }
}