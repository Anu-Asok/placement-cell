import React from 'react';
import ReactDOM from 'react-dom';
import XLSX from 'xlsx';
import Input from './input';

export default class Form extends React.Component{
  render(){
    return (
      <form>  
        <Input fileName="Eligibility" parentState={this.props.getEligibility}/>
        <Input fileName="Applied students" parentState={this.props.getApplied}/>
      </form>
    );
  }
}
