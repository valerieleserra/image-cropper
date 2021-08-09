import React from 'react'
import { Link } from 'react-router-dom'

const Hello = () => {
    return (
      <div>
        <h1>Image Cropper</h1>
        <div className="Hello">
          <Link to='/photos'>
            <button type="button">
              <span role="img" aria-label="camera">
                📚
              </span>
              Photos
      
            </button>
            </Link>
        </div>
      </div>
    );
  };

  export default Hello