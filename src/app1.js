import $ from 'jquery'
import Model from './base/Model.js'

const eventBus = $(window)

// M

const m = new Model({
  data: {
    num: parseInt(localStorage.getItem('num')) || 200
  },
  update (data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('num', m.data.num)
  }
})

// V & C

const view = {
  el: null,
  html: `
    <div>
      <div id="output">
        <span id="number">{{num}}</span>
      </div>
      <div id="operations">
        <button id="add1">+1</button>
        <button id="minus1">-1</button>
        <button id="mul2">×2</button>
        <button id="divide2">÷2</button>
      </div>
    </div>
`,
  eventBus: eventBus,
  init (container) {
    view.el = $(container)
    view.render(m.data.num) // view = render(data)
    view.autoBindEvents()
    eventBus.on('m:updated', () => {
      view.render(m.data.num)
    })
  },
  render (num) {
    if (view.el.children.length !== 0) view.el.empty()
    $(view.html.replace('{{num}}', num))
      .appendTo($(view.el))
  },
  events: {
    'click #add1': 'add',
    'click #minus1': 'minus',
    'click #mul2': 'mul',
    'click #divide2': 'div'
  },
  add () {
    m.update({ num: m.data.num += 1 })
  },
  minus () {
    m.update({ num: m.data.num -= 1 })
  },
  mul () {
    m.update({ num: m.data.num *= 2 })
  },
  div () {
    m.update({ num: m.data.num /= 2 })
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
