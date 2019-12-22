import $ from 'jquery'
import './app2.css'
import Model from './base/Model.js'
import View from './base/View.js'

const localKey = 'app2.index'

// M

const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update (data) {
    Object.assign(m.data, data)
    m.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index)
  }
})

// C
const init = (el) => {
  return new View({
    el: el,
    data: m.data,
    html: (index) => {
      return `
      <div>
        <ul class="tab-bar">
          <li class="${index === 0 ? 'selected' : ''}" data-index="0">1</li>
          <li class="${index === 1 ? 'selected' : ''}" data-index="1">2</li>
        </ul>
        <ul class="tab-content">
          <li class="${index === 0 ? 'active' : ''}">content 1</li>
          <li class="${index === 1 ? 'active' : ''}">content 2</li>
        </ul>
      </div>
  `
    },
    render (data) {
      if (this.el.children.length !== 0) this.el.empty()
      $(this.html(data.index)).appendTo($(this.el))
    },
    events: {
      'click .tab-bar li': 'changeTab'
    },
    changeTab (e) {
      const index = parseInt(e.currentTarget.dataset.index) // 通过 DOM 节点上的 data-index 属性来标记是第几个
      m.update({ index: index }) // 结合 update 方法，把 m.data 里面的 index 替换这个 index
    }
  })
}

export default init
