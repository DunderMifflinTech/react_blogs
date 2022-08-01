import React from 'react';
import {
  BLACK_THEME_COMMON_CLASSES,
  GHOST_THEME_COMMON_CLASSES,
  SOLID_THEME_COMMON_CLASSES,
  WHITE_THEME_COMMON_CLASSES,
} from '../../constants/baseComponentsClasses';

function BaseInput({ variant, className, label, props }) {
  function getClasses() {
    if (variant === 'solid')
      return SOLID_THEME_COMMON_CLASSES + ' outline-[#6246EA]';
    if (variant === 'ghost')
      return GHOST_THEME_COMMON_CLASSES + ' outline-transparent';
    if (variant === 'black')
      return BLACK_THEME_COMMON_CLASSES + ' outline-white';
    return WHITE_THEME_COMMON_CLASSES + ' outline-black';
  }

  return (
    <span className="flex flex-col">
      {!!label && <label>{label}</label>}
      <input
        className={`${getClasses()} focus:outline-black ${className}`}
        {...props}
      />
    </span>
  );
}

export default BaseInput;
