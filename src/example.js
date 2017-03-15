/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Barcode from 'react-barcode';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payDate: '',
      payType: '',
      bizUnitCode: '',
      phoneNumber: '',
      billYearMonth: '',
      rev: '',
      price: '',
      firstBarcode: '',
      secondBarcode: '',
      thirdBarcode: '',
    };
  }

  handleChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;

    this.setState({
      [field]: value.toUpperCase(),
    }, () => {
      this.renderBarcode();
    });
  }

  renderBarcode() {
    const {
      payDate,
      payType,
      bizUnitCode,
      phoneNumber,
      billYearMonth,
      rev,
      price,
    } = this.state;

    if (payDate && payDate.length === 6) {
      this.setState({
        firstBarcode: `${payDate}001`,
      });
    }

    if (payType && payType.length === 2 &&
      bizUnitCode !== undefined && bizUnitCode.length > 0 &&
      phoneNumber && phoneNumber.length === 10) {
      const dashes = '-'.repeat(16 - 2 - bizUnitCode.length - 10);

      this.setState({
        secondBarcode: `${payType}${bizUnitCode}${dashes}${phoneNumber}`,
      });
    }

    if (billYearMonth && billYearMonth.length === 4 &&
      rev !== undefined && rev.length === 2 &&
      price && price.length > 0) {
      const fillZero = '0'.repeat(15 - 4 - 2 - price.length);

      this.setState({
        thirdBarcode: `${billYearMonth}${rev}${fillZero}${price}`,
      });
    }
  }

  render() {
    const {
      payDate,
      payType,
      bizUnitCode,
      phoneNumber,
      billYearMonth,
      rev,
      price,
      firstBarcode,
      secondBarcode,
      thirdBarcode,
    } = this.state;

    return (
      <div style={ { maxWidth: '600px' } }>
        <fieldset>
          <legend>電子帳單資訊</legend>

          <p>請依照您的中華電信電子帳單輸入以下資訊：</p>

          <div className="form-group">
            <label htmlFor="payDate">繳費期限（6碼 <code>YYMMDD</code>）</label>
            <input
              type="text"
              id="payDate"
              className="form-control"
              maxLength="6"
              value={ payDate }
              onChange={ this.handleChange }
            />
          </div>

          <div className="form-inline row">
            <div className="form-group col-xs-12 col-md-5">
              <label htmlFor="payType">帳單別（2碼）</label>
              <input
                type="text"
                id="payType"
                className="form-control"
                maxLength="2"
                value={ payType }
                onChange={ this.handleChange }
              />
            </div>

            <div className="form-group col-xs-12 col-md-offset-1 col-md-5">
              <label htmlFor="bizUnitCode">營運處代號（長度不定）</label>
              <input
                type="text"
                id="bizUnitCode"
                className="form-control"
                maxLength="4"
                value={ bizUnitCode }
                onChange={ this.handleChange }
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">手機號碼（10碼）</label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              maxLength="10"
              value={ phoneNumber }
              onChange={ this.handleChange }
            />
          </div>

          <div className="form-inline row">
            <div className="form-group col-xs-12 col-md-4">
              <label htmlFor="billYearMonth">帳單年月（4碼 <code>YYMM</code>）</label>
              <input
                type="text"
                id="billYearMonth"
                className="form-control"
                maxLength="4"
                value={ billYearMonth }
                onChange={ this.handleChange }
              />
            </div>

            <div className="form-group col-xs-12 col-md-4">
              <label htmlFor="rev">校對碼（2碼）</label>
              <input
                type="text"
                id="rev"
                className="form-control"
                maxLength="2"
                value={ rev }
                onChange={ this.handleChange }
              />
            </div>

            <div className="form-group col-xs-12 col-md-4">
              <label htmlFor="price">繳費金額</label>
              <input
                type="text"
                id="price"
                className="form-control"
                maxLength="9"
                value={ price }
                onChange={ this.handleChange }
              />
            </div>
          </div>
        </fieldset>

        <hr />

        <fieldset>
          <legend>條碼產生結果</legend>

          { !firstBarcode && !secondBarcode && !thirdBarcode && <p>尚未產生</p> }

          { firstBarcode && <Barcode
            format="CODE39"
            value={ firstBarcode }
          /> }

          { secondBarcode && <Barcode
            format="CODE39"
            value={ secondBarcode }
          /> }

          { thirdBarcode && <Barcode
            format="CODE39"
            value={ thirdBarcode }
          /> }
        </fieldset>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
