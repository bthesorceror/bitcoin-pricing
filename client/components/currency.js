const React = require('react')
const _ = require('lodash')

class Currency extends React.Component {
  get rows () {
    return _.map(this.props.values, (value) => {
      let key = `${this.props.currency}-${value.market}`
      let fromValue = this.props.multiplier
      let toValue = this.props.multiplier * value.last

      return (
        <tr key={key}>
          <td>{value.market}</td>
          <td>{fromValue} {value.from}</td>
          <td>{toValue} {value.to}</td>
        </tr>
      )
    })
  }

  render () {
    return (
      <table className='Currency'>
        <thead>
          <tr>
            <th colSpan='3'>
              <h4>
                {this.props.currency}
              </h4>
            </th>
          </tr>
          <tr>
            <th>Market</th>
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

module.exports = Currency
