import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import useMergeStyles from './styles';
import { EBank } from '../../../../../../types';

export type ItemEBankComponentProps = {
  eBank: EBank;
  isSelected: boolean;
  style?: ItemEBankComponentStyles;
  onPressed: () => void;
};

export type ItemEBankComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  avatarContainerStyle?: StyleProp<ViewStyle>;
  bankNameStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  avatarNameTextStyle?: StyleProp<TextStyle>;
  radioContainerStyle?: StyleProp<ViewStyle>;
  innerRadioContainerStyle?: StyleProp<ViewStyle>;
};

const ItemEBankComponent = ({ style, eBank, onPressed, isSelected }: ItemEBankComponentProps) => {
  const styles: ItemEBankComponentStyles = useMergeStyles(style);

  const getShortName = () => {
    const splitNames = eBank.name.split(' ');
    if (splitNames.length === 1) {
      return splitNames[0].charAt(0).toUpperCase();
    }
    return `${splitNames[0].charAt(0)}${splitNames[1].charAt(0)}`.toUpperCase();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPressed} style={styles.containerStyle}>
      <View style={styles.avatarContainerStyle}>
        <Text style={styles.avatarNameTextStyle}>{getShortName()}</Text>
      </View>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.bankNameStyle} numberOfLines={1}>
          {eBank.name}
        </Text>
      </View>
      <View style={styles.radioContainerStyle}>
        {isSelected && <View style={styles.innerRadioContainerStyle} />}
      </View>
    </TouchableOpacity>
  );
};

export default ItemEBankComponent;
