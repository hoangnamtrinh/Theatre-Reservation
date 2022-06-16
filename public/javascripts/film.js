var vueinst = new Vue({
  el: '#main',
  data: {
    play: [],
    date: "",
    time: "",
    dates: [],
    times: [],
    checkedSections: [],
    filterSections: [true, true, true, true, true],
    sections: ['A', 'B', 'C', 'D', 'E'],
    // bookedSeats: [],
  },
  mounted:function() {
    this.getDate()
  },
  methods: {
    getPlay: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst.dates = JSON.parse(this.responseText);
      }
      };
      xhttp.open("GET", "users/getdate", true);
      xhttp.send();
  },
    getDate: function(events) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vueinst.dates = JSON.parse(this.responseText);
        }
        };
        xhttp.open("GET", "users/getdate", true);
        xhttp.send();
    },
    getTime: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst.times = JSON.parse(this.responseText);
      }
      };
      xhttp.open("GET", "users/gettime", true);
      xhttp.send();
    },
    filter: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst.filterSections = JSON.parse(this.responseText);
      }
      };
      xhttp.open("POST", "users/filter", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({ sections: vueinst.checkedSections }));
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