var vueinst = new Vue({
  el: '#main',
  data: {
    reservations: [],
  },
  mounted:function() {
    this.getReservations()
  },
  methods: {
    getReservations: function(events) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          vueinst.dates = JSON.parse(this.responseText);
      }
      };
      xhttp.open("GET", "users/getreservations", true);
      xhttp.send();
    },
  },
});
