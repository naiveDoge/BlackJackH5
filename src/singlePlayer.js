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
    gameInit();
});

function gameInit() {
    gameData['dealer'] = [];
    gameData['dealer'].push(generateCard());
    gameData['dealer'].push(generateCard());
    addCardToDOM('dealersCards', gameData['dealer'][0]);
    
    //add a back of the card
    $('#dealersCards').append(Poker.getBackCanvas(120, '#7A7BB8', '#2E319C'));
}

function addCardToDOM(elementID, card) {
    $('#' + elementID).append(Poker.getCardCanvas(120, generateCardFace(), getCardFromNum(card)));
}


function generateCard() {
    return getRandomInt(13) + 1;
}

function getCardFromNum(cardNum) {
    cardNum = cardNum.toString();
    cardNum = cardNum.replace('11', 'J');
    cardNum = cardNum.replace('12', 'Q');
    cardNum = cardNum.replace('13', 'K');
    cardNum = cardNum.replace('1', 'A');
    return cardNum;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateCardFace() {
    var faces = ['h', 'd', 's', 'c'];
    return faces[getRandomInt(4)];
}