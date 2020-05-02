import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LandingIcon } from '../images/landing-image.svg';

export default function Home() {
  return (
    <div className="landing">
      <LandingIcon className="landing-icon" />
      <Link className="cta-button" to="/metrics">
        Show me the Metrics !
      </Link>
    </div>
  );
}
