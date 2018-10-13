import React from 'react';
import ReactDOM from 'react-dom';
import XLSX from 'xlsx';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


export default class Input extends React.Component{
  handleChange(e){
    var rABS = true;
    var files = e.target.files, f = files[0];
    ReactDOM.findDOMNode(this.refs.uploadBtn).innerHTML='File: '+f.name;
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
      <div className="upload-btn-wrapper">
        <Button ref="uploadBtn" variant="contained" color="default" >
          Upload ({this.props.fileName})
          <CloudUploadIcon className="upload-icon"/>
        </Button>
        <input type="file" ref="upload" onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}
