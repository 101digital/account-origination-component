import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const AttachIcon: React.FC<Props> = ({ width, height, color = '#FF9800' }) => {
  return (
    <SvgCss
      xml={`<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.4403 11.0499L11.2503 20.2399C10.1244 21.3658 8.59747 21.9983 7.00529 21.9983C5.41311 21.9983 3.88613 21.3658 2.76029 20.2399C1.63445 19.1141 1.00195 17.5871 1.00195 15.9949C1.00195 14.4027 1.63445 12.8758 2.76029 11.7499L11.9503 2.55992C12.7009 1.80936 13.7188 1.3877 14.7803 1.3877C15.8417 1.3877 16.8597 1.80936 17.6103 2.55992C18.3609 3.31048 18.7825 4.32846 18.7825 5.38992C18.7825 6.45138 18.3609 7.46936 17.6103 8.21992L8.41029 17.4099C8.03501 17.7852 7.52602 17.996 6.99529 17.996C6.46456 17.996 5.95557 17.7852 5.58029 17.4099C5.20501 17.0346 4.99418 16.5256 4.99418 15.9949C4.99418 15.4642 5.20501 14.9552 5.58029 14.5799L14.0703 6.09992" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `}
      width={width}
      height={height}
    />
  );
};

export { AttachIcon };