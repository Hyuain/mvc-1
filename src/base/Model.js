import EventBus from './EventBus.js'

class Model extends EventBus {
  constructor (options) {
    super()
    return ['data', 'update', 'create', 'delete', 'get'].forEach((key) => {
      if (key in options) {
        this[key] = options[key]
      }
    })
  }

  create () {
    console && console.error && console.error('还没有实现 create')
  }

  delete () {
    console && console.error && console.error('还没有实现 delete')
  }

  update () {
    console && console.error && console.error('还没有实现 update')
  }

  get () {
    console && console.error && console.error('还没有实现 get')
  }
}

export default Model
