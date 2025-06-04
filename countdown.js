(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        year = day * 365;

  let birthday = "Oct 22, 2045 20:00:00",
      countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        let now = new Date().getTime(),
            distance = countDown - now;

          document.getElementById("years").innerText = Math.floor(distance / (year)),
          document.getElementById("days").innerText = Math.floor((distance % (year)) / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          let countdown = document.getElementById("clock");

          document.getElementById("headline").innerHTML = "It's <span class=\"highlight f-bold\"> Today</span>";
          countdown.style.display = "none";

          clearInterval(x);
        }
        //seconds
      }, 0.1)
  }());