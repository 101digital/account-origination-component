import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const MinusIcon: React.FC<Props> = ({ width, height, color = '#D32F2F' }) => {
  return (
    <SvgCss
      xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 12H16" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `}
      width={width}
      height={height}
    />
  );
};

export { MinusIcon };
