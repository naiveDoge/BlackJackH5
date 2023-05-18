import $ from 'jquery';
import './poker.min.js';
import 'bootstrap';

//all cards
var gameData = {
    'dealer': [],
    'player': []
};

$('#buttonStart').click(function(){
    $('#cardWelcome').css('display', 'none');
    $('#cardGaming').css('display', 'block');
    gameInit();
});

$('#buttonHit').click(function(){
    hitCard('player');
});
$('#buttonStand').click(function(){
    $('#buttonStand').prop('disabled', true);
    $('#buttonHit').prop('disabled', true);
    dealerAction();
});

//when starting a new round
function gameInit() {
    gameData['dealer'] = [];
    gameData['dealer'].push(generateCard());
    gameData['dealer'].push(generateCard());
    addCardToDOM('dealersCards', gameData['dealer'][0]);
    
    //add a back of the card
    $('#dealersCards').append('<span id="dealersUnknownCard"></span>');
    $('#dealersUnknownCard').append(Poker.getBackCanvas(120, '#7A7BB8', '#2E319C'));

    //add player's cards
    gameData['player'] = [];
    gameData['player'].push(generateCard());
    gameData['player'].push(generateCard());
    addCardToDOM('playersCards', gameData['player'][0]);
    addCardToDOM('playersCards', gameData['player'][1]);
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
    if (cardNum == '1') {
        cardNum = 'A';
    }
    return cardNum;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateCardFace() {
    var faces = ['h', 'd', 's', 'c'];
    return faces[getRandomInt(4)];
}

function hitCard(target) {
    gameData[target].push(generateCard());
    addCardToDOM(target + 'sCards', gameData[target][gameData[target].length - 1]);
}

//Dealer related functions

function dealerAction() {
    //First remove the hidden card and add its real card
    $('#dealersUnknownCard').remove();
    addCardToDOM('dealersCards', gameData['dealer'][1]);
    //Then add cards for dealer
    while(true) {
        if(sumForCards(gameData['dealer']) > 26) {
            break;
        } else {
            hitCard('dealer');
        }
    }
    //Finally get the winner
    if (sumForCards(gameData['dealer']) < sumForCards(gameData['player'])) {
        alert('u win!');
    } else if (sumForCards(gameData['dealer']) > sumForCards(gameData['player'])) {
        alert('u lose!');
    } else {
        alert('tie');
    }
}

function sumForCards(cards) {
    sum = 0;
    for(var i=0; i<cards.length; i++) {
        if(cards[i]>10) {
            sum += 10;
        } else {
            sum += cards[i];
        }
    }
    return sum;
}