import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component{
  render(){
    return (
      <div className="footer" style={{
        padding: 20,
        bottom: 0,
        color: '#636363',
        backgroundColor: 'white',
        width: '100%',
        fontStyle: 'italic',
        position: 'absolute',
        borderTop: '1px solid #d2d2d2'
      }}
      >
        Developed by <a href="https://github.com/Anu-Asok/">Anupam Asok</a> and <a href="https://github.com/jashi202jg">Jashim Gafoor K K </a>
        <span style={{float: 'right'}}>Support: <a href="mailto:jashi202jg@gmail.com">jashi202jg@gmail.com</a></span>
      </div>
    );
  }
}
