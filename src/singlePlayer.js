import $ from 'jquery';
import './poker.min.js';
import 'bootstrap';
import party from 'party-js';
import notie from 'notie';
import Cookies from 'js-cookie';

//all cards
var gameData = {
    'dealer': [],
    'player': []
};
//first run check
firstRunCheck();

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
$('#buttonRestart').click(function(){
    location.reload();
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
    $('#dealersUnknownCard').animate({opacity: 1});

    //add player's cards
    gameData['player'] = [];
    gameData['player'].push(generateCard());
    gameData['player'].push(generateCard());
    addCardToDOM('playersCards', gameData['player'][0]);
    addCardToDOM('playersCards', gameData['player'][1]);

    //set cookies
    Cookies.set('firstRun', 'FALSE');
}

function addCardToDOM(elementID, card) {
    var randomID = Math.floor(Math.random() * (10 ** 10));
    $('#' + elementID).append('<span id="' + randomID + '" style="opacity: 0;"></span>');
    $('#' + randomID).append(Poker.getCardCanvas(120, generateCardFace(), getCardFromNum(card)));
    $('#' + randomID).animate({opacity: 1});
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
    //Finally calculate the winner
    //Enable restart button
    $('#buttonRestart').css('display', 'inline');
    //First see if someone busts
    if (sumForCards(gameData['dealer']) > 31) {
        if (sumForCards(gameData['player']) > 31) {
            //Tie
            tieAnimation()
        } else {
            //Player wins
            winnerAnimation()
        }
        return;
    } else if (sumForCards(gameData['dealer']) == 31) {
        if (sumForCards(gameData['player']) == 31) {
            //Tie
            tieAnimation()
        } else {
            //Dealer wins
            loserAnimation()
        }
        return;
    } else {
        if (sumForCards(gameData['player']) > 31) {
            //Dealer wins
            loserAnimation()
        } else {
            if (sumForCards(gameData['dealer']) < sumForCards(gameData['player'])) {
                //Player wins
                winnerAnimation()
            } else if (sumForCards(gameData['dealer']) > sumForCards(gameData['player'])) {
                //Dealer wins
                loserAnimation()
            } else {
                //Tie
                tieAnimation()
            }
        }
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

function winnerAnimation() {
    playParty();
    notie.alert({
        type: 1,
        text: 'You Won!',
        stay: true
    });
}

function loserAnimation() {
    notie.alert({
        type: 2,
        text: 'You Lost!',
        stay: true
    });
}

function tieAnimation() {
    notie.alert({
        type: 4,
        text: 'Tie!',
        stay: true
    });
}

function playParty() {
    party.confetti(document.getElementById('playersCards'));
    setTimeout(playParty, 250);
}

//First run check
function firstRunCheck() {
    if (Cookies.get('firstRun')) {
        $('#cardWelcome').css('display', 'none');
        $('#cardGaming').css('display', 'block');
        gameInit();
    }
}