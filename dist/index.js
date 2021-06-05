"use strict";
var BRACK_JACK = 21;
var myCardTotal = 0;
var myCalcCards = [];
var myDispCardInfo = [];
var clubs = [];
var diamonds = [];
var hearts = [];
var spades = [];
var CardInfo = /** @class */ (function () {
    function CardInfo(cardNum, cardSymbol, cardColor) {
        this.cardNum = cardNum;
        this.cardSymbol = cardSymbol;
        this.cardColor = cardColor;
    }
    CardInfo.prototype.equal = function (cardInfo) {
        if (this.cardNum === cardInfo.cardNum &&
            this.cardSymbol === cardInfo.cardSymbol &&
            this.cardColor === this.cardColor) {
            return true;
        }
        return false;
    };
    return CardInfo;
}());
/*
 * 初回読み込み処理
 */
function onLoad() {
    init();
}
/*
 * 初期化処理
 */
function init() {
    clubs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    diamonds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    hearts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    spades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    myCardTotal = 0;
    myCalcCards = [];
    myDispCardInfo = [];
}
/*
 * カード作成処理
 */
function createCard() {
    var cardSymbol = "";
    var color = "";
    var popCard = undefined;
    var canDrow = true;
    do {
        var num = randomNumber(0, 3);
        switch (num) {
            case CardSymbol.Clubs:
                cardSymbol = "♣";
                color = SymbolColor.Black;
                popCard = clubs
                    .splice(Math.floor(Math.random() * clubs.length), 1)
                    .pop();
                break;
            case CardSymbol.Spades:
                cardSymbol = "♠";
                color = SymbolColor.Black;
                popCard = spades
                    .splice(Math.floor(Math.random() * spades.length), 1)
                    .pop();
                break;
            case CardSymbol.Diamonds:
                cardSymbol = "♦";
                color = SymbolColor.Red;
                popCard = diamonds
                    .splice(Math.floor(Math.random() * diamonds.length), 1)
                    .pop();
                break;
            case CardSymbol.Hearts:
                cardSymbol = "❤";
                color = SymbolColor.Red;
                popCard = hearts
                    .splice(Math.floor(Math.random() * hearts.length), 1)
                    .pop();
                break;
            default:
                color = SymbolColor.None;
                break;
        }
    } while (!popCard);
    return new CardInfo(popCard, cardSymbol, color);
}
/*
 * カード追加処理
 */
function addCard() {
    var card = createCard();
    myDispCardInfo.push(card);
    var cardNum = card.cardNum;
    cardNum = convertOverEleven(cardNum);
    myCalcCards.push(cardNum);
    myCalcCards.sort(function (num1, num2) { return num2 - num1; });
    myCardTotal = 0;
    for (var _i = 0, myCalcCards_1 = myCalcCards; _i < myCalcCards_1.length; _i++) {
        var num = myCalcCards_1[_i];
        if (num === 1) {
            myCardTotal += convertOneOrEleven(num);
        }
        else {
            myCardTotal += num;
        }
    }
}
/*
 * ランダムな数字を決定する
 */
function randomNumber(min, max) {
    var row = Math.ceil(min);
    var high = Math.floor(max);
    var randomInt = Math.floor(Math.random() * (high - row + 1) + row);
    return randomInt;
}
/*
 * カード記号を列挙
 */
var CardSymbol = {
    Clubs: 0,
    Diamonds: 1,
    Hearts: 2,
    Spades: 3,
};
var CardSymbolDisp = ["♣", "♦", "❤", "♠"];
/*
 * 記号の色
 */
var SymbolColor = {
    Red: "red",
    Black: "black",
    None: "",
};
/*
 * 11〜13は10としてカウントする
 */
function convertOverEleven(num) {
    var calc = num;
    if (num >= 11) {
        calc = 10;
    }
    return calc;
}
/*
 * 1の振り分け処理.
 * 手札が11以上なら1にして、それ以外は11にする
 */
function convertOneOrEleven(num) {
    var calc = num;
    if (num === 1 && myCardTotal >= 11) {
    }
    else {
        calc = 11;
    }
    return calc;
}
/*
 * HTMLにカードの追加
 */
function addElement(cards) {
    var cardHtml = "<div id=\"cards\"><label>";
    cards.forEach(function (card, index) {
        return (cardHtml += "[" + (index + 1) + ": " + card.cardSymbol + card.cardNum + "]");
    });
    $("#just-cards").append(cardHtml);
}
function deleteElement() {
    var $cards = $("#just-cards").children("#cards");
    if ($cards.length !== 0) {
        $cards.remove();
    }
}
/*
 * Winnerメッセージを返す
 */
function getWinnerMessage() {
    return "WIN!!!";
}
/*
 * Loserメッセージを返す
 */
function getLoserMessage() {
    return "Lose...";
}
/*
 * カードを引くボタン処理
 */
$("#just-drow").on("click", function () {
    addCard();
    deleteElement();
    addElement(myDispCardInfo);
    if (clubs.length === 0 &&
        spades.length === 0 &&
        diamonds.length === 0 &&
        hearts.length === 0) {
        $(this).prop("disabled", true);
    }
});
/*
 * 最初から始めるボタン処理
 */
$("#just-clear").on("click", function () {
    deleteElement();
    init();
    $("#just-drow").prop("disabled", false);
});
// 初期化処理
onLoad();
//# sourceMappingURL=index.js.map