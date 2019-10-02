import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import isEmpty from "lodash/isEmpty";
import ArrowBack from "@material-ui/icons/ArrowBackRounded";

class CurrencyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { currency: {} };
  }

  componentDidMount() {
    Axios.get(
      `https://api.coinmarketcap.com/v1/ticker/${this.props.match.params.id}/`
    )
      .then(response => {
        console.log(response);
        this.setState({ currency: response.data[0] });
      })
      .catch(err => {
        console.error(err);
        this.props.history.goBack();
      });
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <h1>Details</h1>
        <div>
          <Link to="/">
            <ArrowBack />
          </Link>
        </div>
        <hr />
        {!isEmpty(this.state.currency) && (
          <ul>
            {Object.keys(this.state.currency).map((key, index) => (
              <li key={index}>
                <strong>{key}</strong>: {this.state.currency[key]}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default withRouter(CurrencyDetails);
