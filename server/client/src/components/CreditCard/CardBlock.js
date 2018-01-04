import React, { Component } from 'react';
import { Row, Col, Card, CardBody, FormGroup, Form, Label, Input  } from 'reactstrap';
import cardRange from "../../config/card/type.js"
import axios from 'axios';

class CardBlock extends Component {
  constructor (props) {
      super(props);
      this.state = {
        cardnumber: '',
        fakecardnumber:'',
        cardtype:'UNKNOWN',
        expiry: '',
        fullexpiry: '',
        cvv: '',
        formErrors: {cardnumberError: '', expiryError: '', cvvError: ''},
        cardnumberValid: false,
        expiryValid: false,
        formValid: false,
        cvvValid: false
      }
    }
    getCardPost(e)
    {
    var self = this;
    let cardnum = e.target.value.replace(/\s+/g, '');
    console.log(cardnum);
    axios.post('https://pgstaging.emirates.com/restservices/rest/CPGRestService/v1.0/postDetails', 
      {
      _eka: cardnum,
        _ekb:'AE',
        _ekc:'AED',
        _ekd:'BRI',
        _eke:'TXN',
        _ekf:'TRAN00000000000000001',
        _ekg:'',
        _ekh:''
    }).then(function(res){
      console.log(res.data);
      self.setState({cardtype: res.data._ekv});
    })
    }

    validateUserInput (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
                    () => { this.validateField(name, value) });
        switch (name) {
          case "cardnumber":
              this.reMapPlaceholder(e);
              let fakecardnumber = value.replace(/[^0-9]/, '');
              //this.getCardType(fakecardnumber);
              if (fakecardnumber.length > 0) {
                fakecardnumber = fakecardnumber.replace(/ /g,'').match(/.{1,4}/g).join(" ");
            }
            this.setState({fakecardnumber: fakecardnumber});
            break;
          case "expiry":
                this.reMapPlaceholder(e);
                let fullexpiry = value.replace(/[^0-9 /]/, '');
                switch (fullexpiry.length) {
                  case 1:
                    if(isNaN(fullexpiry)) {
                      fullexpiry = "";
                    }
                    else if (fullexpiry > 1) {
                      fullexpiry = "0" + fullexpiry  + " / ";
                    }
                    break;
                  case 2:
                    if(isNaN(fullexpiry)) {
                      fullexpiry = fullexpiry.replace(/[^0-9]/, '');
                      if(isNaN(fullexpiry)) {
                        fullexpiry = "";
                      }
                      else if (fullexpiry > 1) {
                        fullexpiry = "0" + fullexpiry  + " / ";
                      }
                    }
                    else if (fullexpiry <= 0) {
                      fullexpiry = "0";
                    }
                    else if (fullexpiry <= 1) {
                      fullexpiry = "01 / ";
                    }
                    else if (fullexpiry < 13) {
                      fullexpiry = fullexpiry  + " / ";
                    }
                    else {
                      fullexpiry = ("0" + fullexpiry).match(/.{1,2}/g).join(" / ");
                    }
                    break;
                  case 3:
                      fullexpiry = fullexpiry.match(/.{1,2}/g).join(" / ");
                    break;
                  case 4:
                    fullexpiry = fullexpiry.substring(0, 2);
                  break;
                  default:
                    break;
                }
              this.setState({fullexpiry: fullexpiry});
              break;
          default:

        }
    }
    getCardType(value) {
      let validateLength = value.length;
      let cardtype = this.state.cardtype;
      if (validateLength === 0) {
        cardtype = "UNKNOWN";
      }
      else {
        for (var i = 1; i <= validateLength; i++) {
          if (cardRange.hasOwnProperty(i.toString())) {
            let matchvalue = value.toString().substring(0,i);
            if (cardRange[i].hasOwnProperty("match")) {
              for(var ctype in cardRange[i]["match"])
              {
                if(cardRange[i]["match"][ctype].includes(matchvalue)) {
                  cardtype = ctype;
                }
              }
            }
          }
        }
      }
      this.setState({cardtype: cardtype});
    }

    validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let cardnumberValid = this.state.cardnumberValid;
          let expiryValid = this.state.expiryValid;
          let cvvValid = this.state.cvvValid;

          switch(fieldName) {
          case 'cardnumber':
              cardnumberValid = false;
              if(value.trim().length < 1) {
                fieldValidationErrors.cardnumberError = 'Required field!';
              }
              else {
                cardnumberValid = true;
                fieldValidationErrors.cardnumberError = '';
              }
              break;
          case 'expiry':
              expiryValid = value.length > 0;
              fieldValidationErrors.expiryError = expiryValid ? '' : 'Required!';
              break;
          case 'cvv':
              cvvValid = value.length > 0;
              fieldValidationErrors.expiryError = cvvValid ? '' : 'Required!';
              break;
          default:
              break;
      }
      this.setState({ formErrors: fieldValidationErrors,
                      cardnumberValid: cardnumberValid,
                      expiryValid: expiryValid,
                      cvvValid: cvvValid
                    }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.cardnumberValid && this.state.expiryValid && this.state.cvvValid});
    }

  errorClass(error) {
      return(error.length === 0 ? '' : 'error');
   }

   lookupUser(event) {
      if(this.state.formValid) {
      var data = {cardnumber: this.state.cardnumber, expiry: this.state.expiry};
       this.props.loginUser(data);
      }
   }
   mapPlaceholder(e) {
     var ele = e.target;
     ele.setAttribute('placeholder', ele.getAttribute('setplaceholder'));
   }
   reMapPlaceholder(e) {
     var ele = e.target;
     ele.setAttribute('placeholder', ele.getAttribute('resetplaceholder'));
   }

  render() {
      return (
          <Row id="LoginBlock" className="comp-block">
              <Col md="8" lg="6" className="mr-auto mx-auto">
                <Card>
                  <CardBody>
                      <Form>
                          <span>{this.state.cardtype}</span>
                          <FormGroup className={this.errorClass(this.state.formErrors.cardnumberError)}>
                              <Row>
                                  <Col sm="6" className="ml-auto error-message">
                                      <div  className="float-right">{this.state.formErrors.cardnumberError}</div>
                                  </Col>
                              </Row>
                              <Input  maxLength="23"
                              type="text"  name="cardnumber" id="cardnumber" className="form-control-lg" placeholder="Card Number" resetplaceholder="Card Number" setplaceholder="1234 1234 1234 1234"
                              onChange={(event) => this.validateUserInput(event)} onFocus={(event) => this.mapPlaceholder(event)} onBlur={(event) => {this.validateUserInput(event, 'cardnumber');this.getCardPost(event) } } value={this.state.fakecardnumber}  />
                              <Label for="cardnumber" className="font-italic helper-label">Card Number</Label>
                          </FormGroup>
                          <Row>
                              <Col sm="6">
                                <FormGroup className={this.errorClass(this.state.formErrors.expiryError)}>
                                    <Row>
                                        <Col sm="6" className="ml-auto error-message">
                                            <div  className="float-right">{this.state.formErrors.expiryError}</div>
                                        </Col>
                                    </Row>
                                    <Input maxLength="7" type="text" name="expiry" id="expiry" className="form-control-lg" placeholder="Expiry Date" resetplaceholder="Expiry Date" setplaceholder="MM/DD"
                                    onChange={(event) => this.validateUserInput(event)} onFocus={(event) => this.mapPlaceholder(event)} onBlur={(event) => this.validateUserInput(event)} value={this.state.fullexpiry}  />
                                    <Label for="expiry" className="font-italic helper-label">Expiry Date</Label>
                                </FormGroup>
                              </Col>
                              <Col sm="6">
                                <FormGroup className={this.errorClass(this.state.formErrors.cvvError)}>
                                    <Row>
                                        <Col sm="6" className="ml-auto error-message">
                                            <div  className="float-right">{this.state.formErrors.cvvError}</div>
                                        </Col>
                                    </Row>
                                    <Input type="text" name="cvv" id="cvv" className="form-control-lg" placeholder="CVV"
                                    onChange={(event) => this.validateUserInput(event)} onBlur={(event) => this.validateUserInput(event)} value={this.state.cvv}  />
                                    <Label for="expiry" className="font-italic helper-label">CVV</Label>
                                </FormGroup>
                              </Col>
                          </Row>
                      </Form>
                    </CardBody>
                </Card>
              </Col>
          </Row>
      );
  }
};

export default CardBlock;