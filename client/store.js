const _ = require('lodash')
const axios = require('axios')
const EventEmitter = require('events').EventEmitter

class Store extends EventEmitter {
  constructor () {
    super()
    this.state = {}
  }

  update (state) {
    this.state = state
    this.emit('changed')
  }

  get bestPrices () {
    return this.state.best || {}
  }

  get allPrices () {
    return this.state.all || {}
  }

  getAllByMarket () {
    let all = _.reduce(_.keys(this.allPrices), (acc, key) => {
      return _.concat(acc, this.allPrices[key])
    }, [])

    return _.groupBy(all, (value) => { return value.market })
  }

  fetch () {
    axios.get('/conversions')
      .then((response) => {
        this.update(response.data)
      }).catch((err) => {
        this.emit('error', err)
      })
  }
}

module.exports = new Store()
