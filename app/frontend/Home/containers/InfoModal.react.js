import React, { Component } from 'react'
import { connect } from 'react-redux'

class InfoModal extends Component {

  constructor() {
     super();
     this.state = {
      secondsElapsed: 0,
      node: null,
       messageIndex: 1,
       messages:[
         <span>Galactic is a crowdsourced map of the Internet.</span>,
         <span>Use Galactic to search for related content online. <a href="#" className='noUnderline'>Learn more</a>.</span>,
         <span>Help improve Galactic by connecting similar content or websites!</span>,
         <span>Already a fan? <a className='noUnderline' href='#'>Help Spread Galactic!</a></span>,
         <span>Need Ideas? See what&#39;s similar to <a href='#' className='noUnderline'>DonaldTrump.com</a></span>
      ]
    };
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount(){
    window.clearInterval(this.interval)
  }

  render() {
    const that = this;
    const { messageIndex, secondsElapsed } = this.state;

    return (
      <div id="infoModal" className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1" style={{marginBottom: '15px', fontWeight: 'bold'}}>
            <ol style={{position:'inherit', display: 'block', margin: 'auto', textAlign: 'center'}} className="indicators">
              <div style={{
                display: 'block',
                margin: 'auto',
                textAlign: 'center',
                marginBottom: '3px',
                fontFamily: '"DDG_ProximaNova","DDG_ProximaNova_UI_0","DDG_ProximaNova_UI_1","DDG_ProximaNova_UI_2","DDG_ProximaNova_UI_3","DDG_ProximaNova_UI_4","DDG_ProximaNova_UI_5","DDG_ProximaNova_UI_6","Proxima Nova","Helvetica Neue","Helvetica","Segoe UI","Nimbus Sans L","Liberation Sans","Open Sans",FreeSans,Arial,sans-serif',
                fontWeight: 'lighter',
                fontSize: '1.25em',
                color: 'rgba(180,180,180,1)'
              }}>
              {this.state.messages[messageIndex]}
              </div>
              {this.state.messages.map((d, i)=>(
                <a href="javascript:void(0)" key={i} onClick={
                  that._changeMessage.bind(that, i)}>
                  <li className={messageIndex==i?'active liElement infoModalButton':'liElement infoModalButton'} style={{marginLeft: '3px'}}></li>
                </a>
              )
            )}
            </ol>
          </div>
        </div>
      </div>
    );
  }

  _changeMessage(i){
    this.setState({
      messageIndex: i,
      secondsElapsed: 0
    })
  }

  tick() {
    if (this.state.secondsElapsed === 3){
      let newMessageIndex = this.state.messageIndex + 1
      if (newMessageIndex >= 5){
        newMessageIndex = 0;
      }
      this.setState({
        secondsElapsed: 0,
        messageIndex: newMessageIndex
      })
    } else {
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }
  }

}

function mapStateToProps(state) {
  const result = state.inputURLResult.result
  if (result){
    const { node, isURL } = result;
    return {
      node, isURL
    }
  }
  else{
    return {}
  }
}

export default connect(mapStateToProps)(InfoModal)
