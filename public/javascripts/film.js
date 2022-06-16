var vueinst = new Vue({
  el: '#main',
  data: {
    date: "",
    time: "",
    dates: [],
    times: [],
  },
  mounted:function() {
    this.getDate()
  },
  methods: {
      // addPost: function(events) {
      //     var xhttp = new XMLHttpRequest();
      //     xhttp.onreadystatechange = function() {
      //     if (this.readyState == 4 && this.status == 200) {
      //     }
      //     };
      //     xhttp.open("POST", "users/addpost", true);
      //     xhttp.setRequestHeader("Content-type", "application/json");
      //     xhttp.send(JSON.stringify({ title: vueinst.title, content: vueinst.content }));
      // },
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
  },
}); 