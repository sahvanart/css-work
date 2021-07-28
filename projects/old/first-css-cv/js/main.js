class Carousel {

  constructor (element, options = {}) {
    this.element = element
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1,
      //pagination : true
    }, options)

let children = [].slice.call(element.children)
this.currentItem = 0
this.root = this.createDivWithClass('carousel')
this.container = this.createDivWithClass('carousel_container')
this.root.appendChild(this.container)
this.element.appendChild(this.root)
this.items = children.map((child) => {
  let item = this.createDivWithClass('carousel_item')
  item.appendChild(child)
  this.container.appendChild(item)
  return item
})
this.setStyle()
this.createNavigation()
/*if (this.options.pagination) {
  this.createPagination()
}
this.moveCallbacks.forEach(cb => cb(0))*/
}

setStyle () {
  let ratio = this.items.length / this.options.slidesVisible
  this.container.style.width = (ratio * 100) + "%"
  this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")
}

createNavigation () {
  let nextButton = this.createDivWithClass('carousel_next')
  let prevButton = this.createDivWithClass('carousel_prev')
  this.root.appendChild(nextButton)
  this.root.appendChild(prevButton)
  nextButton.addEventListener('click', this.next.bind(this))
  prevButton.addEventListener('click', this.prev.bind(this))
}

createPagination () {
  let pagination = this. createDivWithClass('carousel_pagination')
  let buttons = []
  this.root.appendChild(pagination)
  for (let i = 0; i < this.items.length; i = i + this.options.slidesToScroll) {
    let button = this.createDivWithClass('carousel_pagination_button')
    button.addEventListener('click', () => this.gotoItem(i))
    pagination.appendChild(button)
    buttons.push(button)
  }
  this.onMove(index => {
    let activeButton = buttons[Math.floor(index / this.options.slidesToScroll)]
    if (activeButton) {
      buttons.forEach(button => button.classList.remove('carousel_pagination_button-active'))
      activeButton.classList.add('carousel_pagination_button-active')
    }
  })
}


next () {
  this.gotoItem(this.currentItem + this.options.slidesToScroll)
}

prev () {
  this.gotoItem(this.currentItem - this.options.slidesToScroll)
}

gotoItem (index) {
  if (index < 0) {
    index = this.items.length - this.options.slidesVisible
  } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem)) {
    index = 0
  }
  let translateX = index * (-100 / this.items.length)
  this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
  this.currentItem = index
}

/*onMove (cb) {
  this.moveCallbacks.push(cb)
}*/


createDivWithClass (className) {
  let div = document.createElement('div')
  div.setAttribute('class', className)
  return div
}
}

let onReady = function () {

    new Carousel(document.querySelector('#carousel1'), {
      slidesToScroll: 1,
      slidesVisible: 3,
    
    })
    
    new Carousel(document.querySelector('#carousel2'), {
      slidesToScroll: 1,
      slidesVisible: 3,
    })
    
    new Carousel(document.querySelector('#carousel3'), {
      slidesToScroll: 1 ,
      slidesVisible: 3,
    })
  }

if (document.readyState !== 'loading') {
  onReady()
}

  document.addEventListener('DOMContentLoaded', )


