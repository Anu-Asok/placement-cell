import React from 'react';
import Form from './form';
import Download from './download';


export default class Body extends React.Component{
  constructor(){
    super();
    this.state={
      eligibility:'',
      applied:''
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
  render(){
    return (
      <div>
        <Form getEligibility={this.getEligibility.bind(this)} getApplied={this.getApplied.bind(this)}/>
        <button ref="generate" disabled={!(this.state.eligibility && this.state.applied)}>Generate</button>
        <Download />
      </div>
    );
  }
}
