const React = require('react')
const _ = require('lodash')

class Market extends React.Component {
  get rows () {
    return _.map(this.props.values, (value) => {
      let key = `${this.props.market}-${value.to}`
      let fromValue = this.props.multiplier
      let toValue = this.props.multiplier * value.last

      return (
        <tr key={key}>
          <td>{fromValue} {value.from}</td>
          <td>{toValue} {value.to}</td>
        </tr>
      )
    })
  }

  render () {
    return (
      <table className='market'>
        <thead>
          <tr>
            <th colSpan='2'>
              <h4>
                {this.props.market}
              </h4>
            </th>
          </tr>
          <tr>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {this.rows}
        </tbody>
      </table>
    )
  }
}

module.exports = Market
