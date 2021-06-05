const BRACK_JACK: number = 21;
let myCardTotal: number = 0;
let myCalcCards: number[] = [];
let myDispCardInfo: CardInfo[] = [];

let clubs: number[] = [];
let diamonds: number[] = [];
let hearts: number[] = [];
let spades: number[] = [];

type CardSymbol = "♣" | "♦" | "❤" | "♠";

interface CardAnother {
  cardNum: number;
  cardSymbol: CardSymbol;
  cardColor: string;
  equal(card: CardAnother): boolean;
}
class CardInfo implements CardAnother {
  cardNum: number;
  cardSymbol: CardSymbol;
  cardColor: string;

  constructor(cardNum: number, cardSymbol: CardSymbol, cardColor: string) {
    this.cardNum = cardNum;
    this.cardSymbol = cardSymbol;
    this.cardColor = cardColor;
  }

  equal(cardInfo: CardAnother) {
    if (
      this.cardNum === cardInfo.cardNum &&
      this.cardSymbol === cardInfo.cardSymbol &&
      this.cardColor === this.cardColor
    ) {
      return true;
    }
    return false;
  }
}

/*
 * 初回読み込み処理
 */
function onLoad(): void {
  init();
}

/*
 * 初期化処理
 */
function init(): void {
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
function createCard(): CardInfo {
  let cardSymbol = "" as CardSymbol;
  let color = "";
  let popCard: number | undefined = undefined;
  let canDrow = true;
  do {
    const num = randomNumber(0, 3);
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
function addCard(): void {
  let card = createCard();
  myDispCardInfo.push(card);
  let cardNum = card.cardNum;
  cardNum = convertOverEleven(cardNum);
  myCalcCards.push(cardNum);
  myCalcCards.sort((num1, num2) => num2 - num1);
  myCardTotal = 0;
  for (let num of myCalcCards) {
    if (num === 1) {
      myCardTotal += convertOneOrEleven(num);
    } else {
      myCardTotal += num;
    }
  }
}

/*
 * ランダムな数字を決定する
 */
function randomNumber(min: number, max: number): number {
  const row = Math.ceil(min);
  const high = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (high - row + 1) + row);
  return randomInt;
}

/*
 * カード記号を列挙
 */
const CardSymbol = {
  Clubs: 0,
  Diamonds: 1,
  Hearts: 2,
  Spades: 3,
} as const;
const CardSymbolDisp = ["♣", "♦", "❤", "♠"];

/*
 * 記号の色
 */
const SymbolColor = {
  Red: "red",
  Black: "black",
  None: "",
} as const;

/*
 * 11〜13は10としてカウントする
 */
function convertOverEleven(num: number): number {
  let calc = num;
  if (num >= 11) {
    calc = 10;
  }
  return calc;
}

/*
 * 1の振り分け処理.
 * 手札が11以上なら1にして、それ以外は11にする
 */
function convertOneOrEleven(num: number): number {
  let calc = num;
  if (num === 1 && myCardTotal >= 11) {
  } else {
    calc = 11;
  }
  return calc;
}

/*
 * HTMLにカードの追加
 */
function addElement(cards: CardAnother[]): void {
  let cardHtml = `<div id="cards"><label>`;
  cards.forEach(
    (card, index) =>
      (cardHtml += `[${index + 1}: ${card.cardSymbol}${card.cardNum}]`)
  );
  $("#just-cards").append(cardHtml);
}

function deleteElement(): void {
  const $cards = $("#just-cards").children("#cards");
  if ($cards.length !== 0) {
    $cards.remove();
  }
}

/*
 * Winnerメッセージを返す
 */
function getWinnerMessage(): string {
  return "WIN!!!";
}
/*
 * Loserメッセージを返す
 */
function getLoserMessage(): string {
  return "Lose...";
}

/*
 * カードを引くボタン処理
 */
$("#just-drow").on("click", function () {
  addCard();
  deleteElement();
  addElement(myDispCardInfo);
  if (
    clubs.length === 0 &&
    spades.length === 0 &&
    diamonds.length === 0 &&
    hearts.length === 0
  ) {
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
