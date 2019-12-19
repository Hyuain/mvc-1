import $ from 'jquery'
import './app2.css'
import Model from './base/Model.js'

const eventBus = $(window)

const localKey = 'app2.index'

// M

const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update (data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem(localKey, m.data.index)
  }
})

// C

const view = {
  el: null,
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
  render (index) {
    if (view.el.children.length !== 0) view.el.empty()
    $(view.html(index)).appendTo($(view.el))
  },
  init (container) {
    view.el = $(container)
    view.render(m.data.index) // view = render(data)
    view.autoBindEvents()
    eventBus.on('m:updated', () => {
      view.render(m.data.index)
    })
  },
  events: {
    'click .tab-bar li': 'x'
  },
  x (e) {
    const index = parseInt(e.currentTarget.dataset.index) // 通过 DOM 节点上的 data-index 属性来标记是第几个
    m.update({ index: index }) // 结合 update 方法，把 m.data 里面的 index 替换这个 index
  },
  autoBindEvents () {
    for (const key in view.events) {
      const value = view[view.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      view.el.on(part1, part2, value)
    }
  }
}
export default view
