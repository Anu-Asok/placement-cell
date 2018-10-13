import React from 'react';
import ReactDOM from 'react-dom';
import XLSX from 'xlsx';
import {saveAs}  from 'file-saver';

export default class Download extends React.Component{
  handleClick(){
    var arr = this.props.objects
    console.log(arr);

    var wb = XLSX.utils.book_new();
    wb.props = {
      Title: "SheetJS",
      Subject: "Final List",
      Author: "Placement Cell",
      CreatedDate: new Date(2018,10,13)
    };

    wb.SheetNames.push("Final Sheet");
    var ws = XLSX.utils.json_to_sheet(this.props.objects);
    wb.Sheets["Final Sheet"] = ws;

    var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});

    function s2ab(s){
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for(var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');

  }
  render(){
    return (
      <button id="download" onClick={this.handleClick.bind(this)}>
        Download
      </button>
    );
  }
}
