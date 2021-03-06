import $ from 'jquery'
import EventBus from './EventBus.js'

class View extends EventBus {
  constructor (options) {
    super()
    Object.assign(this, options)
    this.el = $(this.el)
    this.render(this.data)
    this.autoBindEvents()
    this.on('m:updated', () => {
      this.render(this.data)
    })
  }

  autoBindEvents () {
    for (const key in this.events) {
      const method = this[this.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      this.el.on(part1, part2, method)
    }
  }
}

export default View
