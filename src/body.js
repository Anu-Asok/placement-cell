import React from 'react';
import Form from './form';
import Preview from './preview';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import Footer from './footer';

export default class Body extends React.Component{
  constructor(){
    super();
    this.state={
      eligibility:'',
      applied:'',
      result:[]
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
    var obj = {},result=[];
    for(var i =0 ;i<this.state.eligibility.length;i++){
      var a = this.state.eligibility[Object.keys(this.state.eligibility)[i]];
      var key = a[k];
      obj[key] = a;
    }
    for(var i =0 ;i<this.state.applied.length;i++){
      var a = this.state.applied[Object.keys(this.state.applied)[i]];
      var b = a[k];
      if(obj[b]){
        if(!obj[b]['Non core'])
          obj[b]['Non core']='-';
        if(!obj[b]['Core'])
          obj[b]['Core']='-';
        if(!obj[b]['Dream'])
          obj[b]['Dream']='-';
        if(!obj[b]['Remarks'])
          obj[b]['Remarks']='-';
        result.push(obj[b]);
      }
    }
    console.log('from handleClick',result);
    this.setState({
      result
    });
  }
  render(){
    return (
      <div>
        <Form getEligibility={this.getEligibility.bind(this)} getApplied={this.getApplied.bind(this)}/>
        <Button
          variant="extendedFab"
          aria-label="Delete"
          style={{margin:30, marginTop:0}}
          ref="generate"
          disabled={!(this.state.eligibility && this.state.applied)}
          onClick={this.handleClick.bind(this)}
        >
          Click for preview
          <NavigationIcon />
        </Button>
        <Preview result={this.state.result} />
        <Footer />
      </div>
    );
  }
}
