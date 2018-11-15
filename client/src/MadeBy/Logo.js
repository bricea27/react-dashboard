import React from 'react';

//functional component, doesn't utilize life-cycle methods, and no state
const Logo = (props) => {
  return (
    <svg version="1.1" className="logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 144 144" style={{"enableBackground": "new 0 0 144 144"}} xmlSpace="preserve">
      <g>
        <rect x="26.2" y="26.2" className="st0" width="91.6" height="13.1"/>
        <rect x="26.2" y="52.4" className="st0" width="39.3" height="13.1"/>
        <path className="st0" d="M136.8,0H0v144h136.8c4,0,7.2-3.2,7.2-7.2V85.7c0-4-3.2-7.2-7.2-7.2H26.2v13.1h104.7v39.3H13.1V13.1h117.8
          v39.3H78.6v13.1h58.2c4,0,7.2-3.2,7.2-7.2V7.2C144,3.2,140.8,0,136.8,0z"/>
        <rect x="26.2" y="104.7" className="st0" width="39.3" height="13.1"/>
        <rect x="78.5" y="104.7" className="st0" width="39.3" height="13.1"/>
      </g>
    </svg>
  );
}

export default Logo;
