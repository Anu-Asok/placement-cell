import React from 'react';
import ReactDOM from 'react-dom';
import XLSX from 'xlsx';
import {saveAs}  from 'file-saver';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

export default class Download extends React.Component{
  handleClick(){
    var arr = this.props.objects
    console.log(arr);

    var wb = XLSX.utils.book_new();
    wb.props = {
      Title: "SheetJS",
      Subject: "Final List",
      Author: "Placement Cell",
      CreatedDate: new Date()
    };


    wb.SheetNames.push("Final Sheet");
    var ws_data = [['REGISTER NO.','NAME','COURSE','BRANCH','Email','Mobile','Non core','Core','Dream','Remarks']];
    var data=this.props.objects.map((obj)=>{
      return [
        obj['REGISTER NO.'],
        obj['NAME'],
        obj['COURSE'],
        obj['BRANCH'],
        obj['Email'],
        obj['Mobile'],
        obj['Non core'],
        obj['Core'],
        obj['Dream'],
        obj['Remarks']
      ];
    });
    ws_data=ws_data.concat(data);
    console.log(ws_data);
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Final Sheet"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});

    function s2ab(s){
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for(var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }


    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Result.xlsx');

  }
  render(){
    return (
      <Button variant="contained" size="small" onClick={this.handleClick.bind(this)} style={{margin: 30, fontSize: 15, paddingRight: 20}}>
        <SaveIcon style={{margin: 10}}/>
        Download
      </Button>
    );
  }
}
