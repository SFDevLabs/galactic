import React, { Component, PropTypes } from 'react'
import EntityItemTitleHost from './EntityItemTitleHost.react'

const nodeEntityDescriptionStyle = {fontSize: '13px'}

export default class EntityItem extends Component {

  render() {
    const { imageCDN, faviconCDN, canonicalLink, title, description, id, edge=null  } = this.props;

    let edgeImg = null;
    if (imageCDN){
    edgeImg = imageCDN;
    } else if (faviconCDN){
      edgeImg = faviconCDN;
    } else {
      edgeImg = '/img/document.png'
    }


    let edgeDescription = ''
    if (description.length > 200){
      edgeDescription = description.slice(0,200)+"..."
    } else {
      edgeDescription = description
    }

    return (
      <div className="connectionCard">
        <div style={{display: 'block'}}>
          <div style={{float: 'left', maxHeight:'50px', overflow:'hidden'}}>
            <img src={edgeImg} style={{width: '50px' }}/>
          </div>
          <div style={{marginLeft: '60px'}}>
              <EntityItemTitleHost
                title={title}
                id={id}
                canonicalLink={canonicalLink} />
              <span style={nodeEntityDescriptionStyle}>{edgeDescription}</span>
           </div>
            {edge}
        </div>
      </div>
    )
  }
}

EntityItem.propTypes = {
  imageCDN: PropTypes.string.isRequired,
  faviconCDN: PropTypes.string.isRequired,
  canonicalLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  edge: PropTypes.object
}
