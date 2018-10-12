import React from 'react';
import ReactDOM from 'react-dom';

export default class Input extends React.Component{
  handleChange(e){
    var rABS = true;
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = (e)=>{
      var data = e.target.result;
      if(!rABS) data = new Uint8Array(data);
      var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      this.props.parentState(XLSX.utils.sheet_to_json(worksheet));
    };
    if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
  }
  render(){
    return (
      <input type="file" ref="upload" onChange={this.handleChange.bind(this)}/>
    );
  }
}
