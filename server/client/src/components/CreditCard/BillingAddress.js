import React,{Component} from 'react';
import { Row, Col, Card, CardBody, FormGroup, Form, Label, Input  } from 'reactstrap';
import {CountryInfo} from "../../config/card/type.js"

class BillingAddress extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            selected : '',
            Countries: CountryInfo,
            States : [],
            selectedSate:''
        }
        
    }
    getCountryOptions () {
        var options = this.state.Countries;
      //  options.push({Name : 'Select'});
        return options.map(function (country, i) {
            return <option
                key={country.id}
                value={country.Name}>
                {country.Name}
            </option>
        });
    }
     getStateOptions () {
        var options = this.state.States;
        return options.map(function (state, i) {
            return <option
                key={state.id}
                value={state.Name}>
                {state.Name}
            </option>
        });
    }
    onCountryChange(e)
    {
        console.log('cccc');
       
        
        let country = this.state.Countries.filter(s => {
         return s.Name.toLowerCase().match( e.target.value.toLowerCase() );
        });
        this.setState({selected : e.target.value,States: country[0].states});
        console.log(country[0].states);
        
    }
   render () {

    console.log('Countries ' + this.state.Countries);
    var selectedConutry = this.state.selected;
    return(
    <Row id="LoginBlock" className="comp-block">
              <Col md="8" lg="6" className="mr-auto mx-auto">
                <Card>
                  <CardBody>
                      <Form>
                          <FormGroup className=''>
                              <Row>
                                <Col lg="10" md="10" sm="10" xs="12">
                                   <select value={selectedConutry}  onChange={(event) => this.onCountryChange(event)} >
                                       {this.getCountryOptions()}
                                     </select>    
                                </Col>
                              </Row>

                          </FormGroup>
                             <FormGroup className=''>
                              <Row>
                                <Col lg="10" md="10" sm="10" xs="12">
                                   <select value={this.state.selectedSate}>
                                       {this.getStateOptions()}
                                     </select>    
                                </Col>
                              </Row>

                          </FormGroup>
                          </Form>
                          </CardBody>
                          </Card>
                          </Col>
                          </Row>
    );
    }
}
export default BillingAddress;