import React from 'react';
import {
  BLACK_THEME_COMMON_CLASSES,
  GHOST_THEME_COMMON_CLASSES,
  SOLID_THEME_COMMON_CLASSES,
  WHITE_THEME_COMMON_CLASSES,
} from '../../constants/baseComponentsClasses';

function BaseButton({ children, variant, className, ...restProps }) {
  function getClasses() {
    if (variant === 'solid')
      return SOLID_THEME_COMMON_CLASSES + ' hover:outline-[white]';
    if (variant === 'ghost')
      return GHOST_THEME_COMMON_CLASSES + ' hover:outline-transparent';
    if (variant === 'black')
      return BLACK_THEME_COMMON_CLASSES + ' hover:outline-white';
    return WHITE_THEME_COMMON_CLASSES + ' hover:outline-black';
  }

  return (
    <button
      className={`${getClasses()} active:scale-95 ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default BaseButton;
