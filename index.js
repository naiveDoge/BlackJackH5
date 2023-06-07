import $ from "jquery";
import 'bootstrap';
import Cookies from 'js-cookie';

$('#navSingle').click(function(){
    $('#mainIframe').attr('src', './src/singlePlayer.html');
});

$('#mainIframe').on('load', function(){
    scoreboardUpdate();
});

scoreboardUpdate();

function scoreboardUpdate() {
    if (!Cookies.get('scoreboard')) {
        Cookies.set('scoreboard', JSON.stringify({'W': 0, 'L': 0, 'T': 0}));
    }

    var scoreboard = JSON.parse(Cookies.get('scoreboard'));
    $('#score-W').html(scoreboard['W']);
    $('#score-L').html(scoreboard['L']);
    $('#score-T').html(scoreboard['T']);
}