---
layout: page
title: Countdown
show_sidebar: false
---

<!-- Display the countdown timer in an element -->
<div style="display : flex; justify-content : center;">
    <div style="flex-direction: column; display : flex;">
        <p style="font-size: 40px; font-weight: bold; text-align: center" id="countdown"></p>
        <p style="font-size: 40px; font-weight: bold; text-align: center" id="flavortext"></p>
    </div>
</div>

<script>
    // Set the date we're counting down to
    var countDownDate = new Date("Mar 24, 2023 16:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        console.log(days)

        // Display the result in the element with id="countdown"
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "Finally. My Quest is Complete";
            document.getElementById("flavortext").innerHTML = "I've missed you";
        }
        else if (days < 7)
        {
            document.getElementById("flavortext").innerHTML = "This week, my love. This week";
        }
        else if (days < 14)
        {
            document.getElementById("flavortext").innerHTML = "2 weeks away. Hope the committee is ready";
        }
        else if (days < 21)
        {
            document.getElementById("flavortext").innerHTML = "3 more weeks, and you're going to have your own personal chef.";
        }
        else if (days < 28)
        {
            document.getElementById("flavortext").innerHTML = "A little more than 4 weeks away. I cannot wait to wrap you in my arms";
        }
        else if (days <= 35)
        {
            document.getElementById("flavortext").innerHTML = "And you thought I wasn't going to recode it ;)";
        }

    }, 1000);
</script>

