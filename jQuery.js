var playing = false;
var score;
var hearts;
var step;
var fruits = ['apple', 'banana', 'berry', 'cherry', 'grapes', 'guava', 'lemon', 'mango', 'orange', 'papaya', 'pineapple', 'pomegranate', 'watermelon'];
$(function() {
    $("#start").click(function() {
        if (playing == true) {
            location.reload();
        } else {
            playing = true;
            score = 0;
            $("#scorevalue").html(score);
            $("#life").show();
            hearts = 3;
            addHearts();
            $("#over").hide();
            $("#start").html("Reset");
            startAction();
        }
    });
    $("#fruit1").mouseover(function() {
        score++;
        $("#scorevalue").html(score);
        $("#slice")[0].play();
        clearInterval(action);
        $("#fruit1").hide("explode", 100);
        setTimeout(startAction, 100);
    });

    function addHearts() {
        $("#life").empty();
        for (var i = 0; i < hearts; i++) {
            $("#life").append('<img src="images/heart.png" class="lifeheart">');
        }
    }

    function startAction() {
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({
            'left': Math.round(650 * Math.random()),
            'top': -50
        });
        step = 1 + Math.round(5 * Math.random());
        action = setInterval(function() {
            $("#fruit1").css('top', $("#fruit1").position().top + step);
            if ($("#fruit1").position().top > $("#fcontainer").height()) {
                if (hearts > 1) {
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({
                        'left': Math.round(650 * Math.random()),
                        'top': -50
                    });
                    step = 1 + Math.round(5 * Math.random());
                    hearts--;
                    addHearts();
                } else {
                    playing = false;
                    $("#over").show();
                    $("#start").html('Start');
                    $("#over").html('<p>Game Over!</p> <p>Your score is ' + score + '</p>');
                    $("#life").hide();
                    stopAction();
                }
            }
        }, 10);
    }

    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(10 * Math.random())] + '.png');
    }

    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }
});