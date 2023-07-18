import React from 'react';
import { GHOST_THEME } from './TagsCustomVals';

function Tags({value}) {
  return (
        <span
          className= {GHOST_THEME}
        >
          {value}
        </span>
  );
}

export default Tags;
