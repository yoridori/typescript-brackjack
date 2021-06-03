const BRACK_JACK: number = 21;
let myCardTotal: number = 0;
let myDispCards: CardImpl[] = [];
let myCalcCards: number[] = [];

/*
 * カード追加処理
 */
function addCard(): void {
  /* let card = createCard();
  while(myDispCards.some(dispCard => dispCard.equal(card))){
    card = createCard();
  }
  myDispCards.push(createCard());
  let cardNumber = myDispCards[myDispCards.length - 1].num;
  cardNumber = convertOverEleven(cardNumber);
  myCalcCards.push(cardNumber);
  myCalcCards.sort((num1, num2) => num2 - num1);
  myCardTotal = 0;
  for (let num of myCalcCards) {
    if (num === 1) {
      myCardTotal += convertOneOrEleven(num);
    } else {
      myCardTotal += num;
    }
  } */
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
 * カードインタフェース
 */
interface Card {
  num: number;
  cardSymbol: string;
  color: string;
  equal(card:Card): boolean;
}

class CardImpl implements Card {
  num: number;
  cardSymbol: string;
  color: string;

  constructor(num: number, cardSymbol: string, color: string){
      this.num = num;
      this.cardSymbol = cardSymbol;
      this.color = color;
  }

  equal(card: Card): boolean{
      if(this.num === card.num && this.cardSymbol === card.cardSymbol && this.color === card.color){
          return true;
      }
      return false;
  }
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

function createCard(): Card {
  const num = getCardNumber();
  const symbolNum = randomNumber(0, 3);
  const cardSymbol = getCardSymbol(symbolNum);
  const color = getCardColor(symbolNum);
  return new CardImpl(num, cardSymbol, color);
}

function getCardNumber(): number {
  let cardNumber = randomNumber(1, 13);
  return cardNumber;
}

/*
 * ランダムな記号を決定する
 */
function getCardSymbol(num: number): string {
  let cardSymbol = CardSymbolDisp[num];
  return cardSymbol;
}

function getCardColor(num: number): string {
  let color = "";
  switch (num) {
    case CardSymbol.Clubs:
    case CardSymbol.Spades:
      color = SymbolColor.Black;
      break;
    case CardSymbol.Diamonds:
    case CardSymbol.Hearts:
      color = SymbolColor.Red;
      break;
    default:
      color = SymbolColor.None;
      break;
  }
  return color;
}
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
function addElement(cards: Card[]): void {
  let cardHtml = `<div id="cards"><label>`;
  cards.forEach(
    (card, index) =>
      (cardHtml += `[${index + 1}: ${card.cardSymbol}${card.num}]`)
  );
  // for (let card of cards) {
  //   cardHtml += `[1: ${card.cardSymbol}${card.num}]`;
  // }
  $("#just-cards").append(cardHtml);
}

function deleteElement(): void {
  const $cards = $("#just-cards").children("#cards");
  if ($cards.length !== 0) {
    $cards.remove();
  }
}

/*
 * 21になったらWinnerメッセージを出す
 */
function getWinnerMessage(): string {
  return "WIN!!!";
}
/*
 * 22以上になったらLoserメッセージを出す
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
  addElement(myDispCards);
});

/*
 * 最初から始めるボタン処理
 */
