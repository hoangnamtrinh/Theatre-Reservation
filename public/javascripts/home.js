var vueinst = new Vue({
  el: '#app',
  data: {
    link: "",
    plays: [],   
  },
  mounted:function() {
    this.getPlays()
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
    getPlays: function(events) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vueinst.plays = JSON.parse(this.responseText);
        }
        };
        xhttp.open("GET", "users/getplays", true);
        xhttp.send();
    },
  },
}); 

function getPlay(id) {
    console.log(id);
    window.location.href = ('/users/play/' + String(id));
}