//卡片圖案此處 Symbols 常數儲存的資料不會變動，因此習慣上將首字母大寫以表示此特性。
const Symbols = [
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png', // 黑桃
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png', // 愛心
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png', // 方塊
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png' // 梅花
]

const view = {
  //負責生成卡片內容，包括花色和數字
  getCardElement () {
    return `
      <div class="card">
        <p>4</p>
        <img src="https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png" alt="">
        <p>4</p>
      </div>`
  },

  //負責選出#cards並抽換內容
  displayCards() {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = this.getCardElement()
  }
}

view.displayCards()