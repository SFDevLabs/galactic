import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader';
import Navbar from "../../components/Navbar.react"
import EntityItem from "../../components/Entity/"
import EdgeConnection from "../../components/EdgeConnection"
import TagsInput from "../components/TagsInput.react"


import { Alert, Tooltip, OverlayTrigger  } from "react-bootstrap"
import { getNode, postNodeTags } from "../actions/index"

const responsiveClasses = [
        'col-xs-12','col-sm-10',
        'col-sm-offset-1',
        'col-md-10',
        'col-md-offset-1'].join(' ')

class NodeMain extends Component {

  constructor() {
     super()
     const messageFlag = window.location.search.search((/message=true/))
     this.state = {
       messageFlag: messageFlag!=-1?true:false
     }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getNode(window.location.pathname.replace('/node/',''))) //@todo include this in the page
  }

  render() {
    const that = this;
    const { nodeResult, user } = this.props
    const { messageFlag } = this.state

    if (!nodeResult || Object.keys(nodeResult).length==0) {
      return (
      <div>
        <Navbar/>
        <Loader top={'30%'} />
      </div>)
    }

    const { superEdges, faviconCDN, title, entityCount, canonicalLink, description } = nodeResult

    const connectHref = "/connect?url="+canonicalLink

    const prettyLink = canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'');

    let documentImage = (<span><img src="/img/document.png" style={{height: '30px'}} /></span>)
    if (faviconCDN){
      documentImage = (<span><img src={faviconCDN} style={{width: '16px'}} /></span>)
    }

    const nodeEdges = superEdges.map(function(superEdge, i){

      const { users, entity, edges, entityCount } = superEdge;
      const user = edges[0].user;
      const createdAt = edges[0].createdAt;
      let tags = edges.map(edge=>edge.tags).reduce((a, b)=>a.concat(b));
      const edgeComponentJSX =(
        <EdgeConnection
          username={user.username}
          profileImageUrl={user.twitter.profile_image_url}
          createdAt={Number(createdAt)}
          length={edges.length}
          />
        )

      const currentUserEdgeId = that._getCurrentUserEdgeId(edges, user); //Has the user created an edge to tag along this route?
      const tagInputJSX = currentUserEdgeId? <TagsInput tags={tags} id={currentUserEdgeId} />:null;

      return (
        <div
          style={{paddingBottom:'1em'}}
          key={i}>
          <EntityItem
            count={entityCount}
            imageCDN={entity.imageCDN.url?entity.imageCDN.url:''}
            faviconCDN={entity.faviconCDN?entity.faviconCDN:''}
            canonicalLink={entity.canonicalLink}
            title={entity.title}
            description={entity.description}
            id={entity._id}
            edge={edgeComponentJSX}
          />
          <div style={{marginTop:'3px'}}>
            {tagInputJSX}
          </div>
        </div>)
    });

    const tooltip = (
      <Tooltip id="emptyNodeTooltip" className="wikiweb-tooltip">When you connect two URLs together, you are helping to grow the WikiWeb since other people can find those connections later.</Tooltip>
    );

    const emptyMessage = nodeEdges.length==0?
    <div>
      <h3>Shucks! There are no connections to this site <i>yet</i>.</h3>
      <p>
        You chould be the first to&nbsp;
        <b><a href={connectHref}>create one</a></b>.
          <OverlayTrigger placement="top" overlay={tooltip}>
            <sup>
            <span className="fa fa-info-circle" style={{color: '#337ab7'}}></span>
            </sup>
          </OverlayTrigger>
      </p>
    </div>
    :null;

    let descriptionClipped = ''
    if (description.length > 200){
      descriptionClipped = description.slice(0,200)+"..."
    } else {
      descriptionClipped = description
    }

    return (
      <div>
      <Navbar />
      <div className="container">
        <div className={responsiveClasses+' row'}>
          <div>
            <div>
              <br />
              <h3>{title} <span className="label label-default">{entityCount}</span></h3>
              <div>
                {documentImage}
                <a href={canonicalLink} className="noUnderline">
                <span>{prettyLink}</span>
                </a>
              </div>
              <div style={{fontSize:'14px'}}>{descriptionClipped}</div>
            </div>
          </div>
          <div>
            <div
              style={{fontSize: '17px', fontWeight: 'bold', marginTop: '5px'}}>
                <a href={connectHref}>
                   <button
                     type="button"
                     className="btn btn-default">
                     Add a new connection
                   </button>
                 </a>
              </div>
            </div>
            <hr />
        </div>

        <div className={responsiveClasses + ' row'}>
          {messageFlag && superEdges[0]?
            <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
              <h4>You added a new Connection!</h4>
              <p>Every connection on the WikiWeb makes it that much more useful for the next person.</p>
              <br/>
            </Alert>
           :null}
          <div className={messageFlag?'highlight-first':''}>
            {nodeEdges}
          </div>
          <div style={{margin:'50px'}}>
            {emptyMessage}
          </div>
        </div>
      </div>
      </div>
    );
  }
  _addTag(id){
    this.props.dispatch( postNodeTags(id, this.state.tagInput.split(' ') ));
    this.setState({
      tagInput: ''
    });
  }

  _getCurrentUserEdgeId(edges, user){
    const currentUserEdge = edges.find(e=>e.user._id==user._id);
    return currentUserEdge?currentUserEdge._id:null;
  }

}

function mapStateToProps(state) {
  const { nodeResult, edgeResult, userResult } = state;
  let user = null;
  if ( userResult && userResult.success ){
    user = userResult;
  }
  return {
    nodeResult,
    edgeResult,
    userResult,
    user
  }
}


export default connect(mapStateToProps)(NodeMain)
