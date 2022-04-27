import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const OngoingIcon: React.FC<Props> = ({ width, height, color = '#DCF5FC' }) => {
  return (
    <SvgCss
      xml={`<svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43.0833 74.4167C60.3883 74.4167 74.4167 60.3883 74.4167 43.0833C74.4167 25.7784 60.3883 11.75 43.0833 11.75C25.7784 11.75 11.75 25.7784 11.75 43.0833C11.75 60.3883 25.7784 74.4167 43.0833 74.4167Z" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M82.2504 82.25L65.2129 65.2125" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M55.5 55.125V51.875C55.5 50.1511 54.8152 48.4978 53.5962 47.2788C52.3772 46.0598 50.7239 45.375 49 45.375H36C34.2761 45.375 32.6228 46.0598 31.4038 47.2788C30.1848 48.4978 29.5 50.1511 29.5 51.875V55.125" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42.5 38.875C46.0899 38.875 49 35.9649 49 32.375C49 28.7851 46.0899 25.875 42.5 25.875C38.9101 25.875 36 28.7851 36 32.375C36 35.9649 38.9101 38.875 42.5 38.875Z" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `}
      width={width}
      height={height}
    />
  );
};

export { OngoingIcon };
