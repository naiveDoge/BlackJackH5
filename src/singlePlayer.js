import $ from 'jquery';
import './poker.min.js';
import 'bootstrap';

var gameData = {
    'dealer': [],
    'player': []
};

$('#buttonStart').click(function(){
    $('#cardWelcome').css('display', 'none');
    $('#cardGaming').css('display', 'block');
});

function gameInit() {

}

function generateCard() {
    var cardNum = getRandomInt() + 1;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}