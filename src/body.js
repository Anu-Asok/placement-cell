import React from 'react';
import Form from './form';
import Download from './download';
import Preview from './preview';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';


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
    var k = 'REGISTER NO.', obj;
    var arr = [], result=[];
    for(var i =0 ;i<this.state.applied.length;i++){
      var a = this.state.applied[Object.keys(this.state.applied)[i]];
      arr.push(a[k]);
    }
    for(var i =0 ;i<this.state.eligibility.length;i++){
      var obj = this.state.eligibility[Object.keys(this.state.eligibility)[i]];
      if(arr.includes(obj[k])){
        if(!obj['Non core'])
          obj['Non core']='-';
        if(!obj['Core'])
          obj['Core']='-';
        if(!obj['Dream'])
          obj['Dream']='-';
        if(!obj['Remarks'])
          obj['Remarks']='-';
        result.push(obj);
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
        <Download objects={this.state.result}/>
      </div>
    );
  }
}
