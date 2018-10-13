import React from 'react';
import ReactDOM from 'react-dom';
import XLSX from 'xlsx';
import Input from './input';

export default class Form extends React.Component{
  fileToObjects(fileName){
    var reader = new FileReader();
    var rABS = true;
    reader.onload = function(e) {
      var data = e.target.result;
      if(!rABS) data = new Uint8Array(data);
      var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.props.getEligibility(XLSX.sheet_to_json(worksheet));
    };
    if(rABS) reader.readAsBinaryString(fileName); else reader.readAsArrayBuffer(fileName);
  }
  handleSubmit(e){
    e.preventDefault();
    var eligibility = this.fileToObjects(this.refs.eligibility.files[0]),
        applied = this.fileToObjects(this.refs.applied.files[0]);

    this.props.getEligibility(eligibility);
    this.props.getApplied(applied);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Input fileName="Eligibility" parentState={this.props.getEligibility}/>
        <Input fileName="Applied students" parentState={this.props.getApplied}/>
      </form>
    );
  }
}
