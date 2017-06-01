const React = require('react')
const ReactDOM = require('react-dom')
const Store = require('./store')

const Overview = require('./components/overview')

ReactDOM.render(
  <Overview />,
  document.querySelector('#content')
)

Store.fetch()

setInterval(() => {
  Store.fetch()
}, 10000)
