import React, { useEffect } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type ErrorMessageModalProps = {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
  style?: ErrorMessageModalStyles;
};

export type ErrorMessageModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
};

const ErrorMessageModal = ({
  style,
  isVisible,
  onClose,
  message,
  duration,
}: ErrorMessageModalProps) => {
  const styles: ErrorMessageModalStyles = useMergeStyles(style);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        onClose();
      }, duration ?? 3000);
    }
  }, [isVisible]);

  return (
    <BottomSheet
      backdropOpacity={0}
      isVisible={isVisible}
      style={{
        containerStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <View style={styles.containerStyle}>
        <Text style={styles.messageStyle}>{message}</Text>
      </View>
    </BottomSheet>
  );
};

export default ErrorMessageModal;
