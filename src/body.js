import React from 'react';
import Form from './form';
import Download from './download';
import Preview from './preview';

export default class Body extends React.Component{
  constructor(){
    super();
    this.state={
      eligibility:'',
      applied:'',
      result:[{
        'REGISTER NO.':'TCR15CS013',
        'NAME':'Anupam Asok',
        'COURSE':'B.Tech'
      }]
    };
  }
  getEligibility(objects){
    this.setState({
      eligibility:objects
    })
    console.log('called eligibility', this.state.eligibility);
  }
  getApplied(objects){
    console.log(objects);
    this.setState({
      applied:objects
    })
    console.log('called applied', this.state.applied);
  }
  handleClick(){
    var k = 'REGISTER NO.';
    var arr = [], result=[];
    for(var i =0 ;i<this.state.applied.length;i++){
      var a = this.state.applied[Object.keys(this.state.applied)[i]];
      arr.push(a[k]);
    }
    for(var i =0 ;i<this.state.eligibility.length;i++){
      var b = this.state.eligibility[Object.keys(this.state.eligibility)[i]];
      if(arr.includes(b[k])){
        result.push(this.state.eligibility[Object.keys(this.state.eligibility)[i]]);
      }
    }    
    this.setState({
      result
    });

  }
  render(){
    return (
      <div>
        <Form getEligibility={this.getEligibility.bind(this)} getApplied={this.getApplied.bind(this)}/>
        <button ref="generate" disabled={!(this.state.eligibility && this.state.applied)} onClick={this.handleClick.bind(this)}>Click for preview</button>
        <Preview result={this.state.result} />
        <Download />
      </div>
    );
  }
}
