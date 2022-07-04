//卡片圖案此處 Symbols 常數儲存的資料不會變動，因此習慣上將首字母大寫以表示此特性。
const Symbols = [
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png', // 黑桃
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png', // 愛心
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png', // 方塊
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png' // 梅花
]

const view = {
  //負責生成卡片內容，包括花色和數字
  getCardElement (index) {
    return `<div data-index="${index}" class="card back"></div>`
  },

  getCardContent (index) {
    const number = this.transformNumber((index % 13) + 1) //ex 1 % 13 = 1在加1就變成2 卡片數字 
    //0~12 / 13 捨去小數點 都會是0所以在Symbols 陣列裡都會是索引值0的黑桃
    const symbol = Symbols[Math.floor(index / 13)]  //取得卡片花色
    return `
        <p>${number}</p>
        <img src="${symbol}" alt="">
        <p>${number}</p>`
  },

  //特殊數字轉換：transformNumber 11,12,13,1 JQKA
  transformNumber(number) {   //呼叫 transformNumber會回應的數字
    switch (number) {
      case 1:
        return "A" //數字是1回傳Ａ
      case 11:
        return "J"
      case 12:
        return "Q"
      case 13:
        return "K"
      default:
        return number   //不在上面的數字回傳該數字
    }
  },

  //負責選出#cards並抽換內容
  displayCards() {
    const rootElement = document.querySelector('#cards')
    //用Array.from(Array(52).keys())產生內容有52個的陣列在用array.map迭代
    rootElement.innerHTML = utility.getRandomNumberArray(52).map(index => this.getCardElement(index)).join('')
  },

  //翻牌函式
  flipCard (card) {
    console.log(card)
    if (card.classList.contains('back')) {
      //如果點的是背面回傳正面
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(Number(card.dataset.index))
      return
    }
    //如果點的是正面回傳背面
    card.classList.add('back')
    card.innerHTML = null
  },


}

//洗牌演算法
const utility = {
  getRandomNumberArray (count) {
    const number = Array.from(Array(count).keys())
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      //解構賦值 等號兩邊如果都是[] or {} 就可以交換
        [number[index], number[randomIndex]] = [number[randomIndex], number[index]]
    }
    return number
  }
}

view.displayCards()

//給每張卡片加上監聽器
//先選出所有卡片會是一個NodeList 在用forEach迭代 把每一張卡片加上監聽器
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', event => {
    //改成翻牌函式
    view.flipCard(card)
  })
})