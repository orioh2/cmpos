import React, { Component } from 'react';
import TransactionRequest from "./../../models/transaction";
import { connect } from "react-redux";
import * as shopActions from "../../actions/shop.action";
import { Field, reduxForm } from "redux-form";
import "./payment.css";

class Payment extends Component {

  isMustChanged = () => {
    try {
      const { form, shopReducer } = this.props;
      return form.paymentForm.values.given > shopReducer.mTotalPrice;
    } catch (err) {
      return false;
    }
  };

  onClickGiven = value => {
    const { change, form } = this.props;
    const newGiven = value + form.paymentForm.values.given;
    change("given", newGiven);
    this.updateChange(newGiven);
  };

  onClickExact = () => {
    const { change } = this.props;
    change("given", this.props.shopReducer.mTotalPrice);
    this.updateChange(0);
  };

  onClickClear = () => {
    this.props.change("given",0)
  };

  updateChange = given => {
    let change = given - this.props.shopReducer.mTotalPrice;
    if (change > 0) {
      this.props.change("change", change);
    } else {
      this.props.change("change", 0);
    }
  };

  showChangeField = () => {
    return (
      <div className="form-group" style={{ marginTop: 8 }}>
        <label htmlFor="change">Change</label>
        <Field
          component="input"
          type="text"
          style={{ fontSize: 30, height: 50, borderRadius: 5 }}
          disabled
          className="form-control"
          name="change"
          id="change"
        />
      </div>
    );
  };

  onClickSubmit = () => {
    const { props } = this;

    let trans = new TransactionRequest();
    trans.total = props.shopReducer.mTotalPrice;
    trans.paid = props.form.paymentForm.values.given;
    trans.change = props.form.paymentForm.values.change;
    trans.payment_type = "cash";
    trans.payment_detail = "full";
    trans.seller_id = "sr0001";
    trans.buyer_id = "by0000";
    trans.order_list = "1234";
    this.props.submitPayment(trans);
  };

  render() {
    return (
      <div className="row">
        <form>
          <section
            style={{ backgroundColor: "rgb(255, 254, 254)", padding: 100 }}
          >
            <div className="form-group">
              <div className="form-group" style={{ marginTop: 8 }}>
                <label htmlFor="paid">Paid</label>
                <span
                  style={{ fontSize: 30, height: 50, borderRadius: 5 }}
                  className="currencyinput form-control"
                >
                  ฿
                  <Field
                    type="text"
                    component="input"
                    style={{ fontSize: 30, height: 45 }}
                    name="given"
                    onChange={event => this.updateChange(event.target.value)}
                    id="paid"
                  />
                </span>
              </div>

              {this.isMustChanged() && this.showChangeField()}
              <div className="row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <div
                    className="note_button"
                    onClick={() => this.onClickGiven(1000)}
                  >
                    ฿1,000
                  </div>
                  <div
                    className="note_button"
                    onClick={() => this.onClickGiven(500)}
                  >
                    ฿500
                  </div>
                  <div
                    className="note_button"
                    onClick={() => this.onClickGiven(100)}
                  >
                    ฿100
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <div
                    className="note_button"
                    onClick={() => this.onClickGiven(50)}
                  >
                    ฿50
                  </div>
                  <div
                    className="note_button"
                    onClick={() => this.onClickGiven(20)}
                  >
                    ฿20
                  </div>
                  <div
                    className="note_button"
                    onClick={() => this.onClickGiven(10)}
                  >
                    ฿10
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <div
                    className="col-sm-4 payment_button"
                    style={{ background: "rgb(149, 150, 147)" }}
                    onClick={this.onClickClear}
                  >
                    CLR
                  </div>
                  <div
                    className="col-sm-4 payment_button"
                    style={{ background: "#00a65a" }}
                    onClick={this.onClickExact}
                  >
                    EXACT
                  </div>
                  <div
                    className="col-sm-4 payment_button"
                    style={{ background: "#D50000" }}
                    onClick={() => this.onClickSubmit()}
                  >
                    SUBMIT
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({shopReducer,form}) => ({
  shopReducer,
  form
})

const mapDispatchToProps = {
  ...shopActions
}

Payment = connect(mapStateToProps,mapDispatchToProps)(Payment);
export default reduxForm({
  form:"paymentForm",
  initialValues: { given: 0, change: 0 }
})(Payment)