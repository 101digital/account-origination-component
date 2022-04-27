import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, ThemeContext } from 'react-native-theme-component';
import RadioGroupComponent, {
  RadioData,
  RadioGroupComponentStyles,
} from '../../../../../sub-components/radio-group';
import useMergeStyles from './styles';

export type SelectDocumentTypeModalProps = {
  isVisible: boolean;
  initValue?: string;
  onClose: () => void;
  onValueChanged: (value: RadioData) => void;
  style?: SelectDocumentTypeModalStyles;
};

export type SelectDocumentTypeModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
  radioGroupComponentStyle?: RadioGroupComponentStyles;
};

const SelectDocumentTypeModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
}: SelectDocumentTypeModalProps) => {
  const styles: SelectDocumentTypeModalStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const _types = [
    { id: '1', label: 'Income Tax Return (ITR)' },
    { id: '2', label: 'Payslip' },
    { id: '3', label: 'Audited Financial Statement' },
    { id: '4', label: 'Deed of Sale' },
    { id: '5', label: 'Deed of Donation' },
    { id: '6', label: 'Loan Application' },
    { id: '7', label: 'Others' },
  ];
  const [value, setValue] = useState<RadioData | undefined>(undefined);

  useEffect(() => {
    if (initValue) {
      setValue(_types.find((c) => c.id === initValue || c.label === initValue));
    }
  }, [initValue]);

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>
          {i18n?.t('edd_component.lbl_select_document_type') ?? 'Select document type'}
        </Text>
        <RadioGroupComponent
          value={value}
          data={_types}
          onChangeValue={(v) => {
            setValue(v);
          }}
          style={styles.radioGroupComponentStyle}
        />
        <Button
          onPress={() => {
            onValueChanged(value!);
          }}
          label={i18n?.t('edd_component.btn_select') ?? 'Select'}
          disableColor={colors.secondaryButtonColor}
          disabled={value === undefined}
          style={{
            primaryContainerStyle: {
              marginTop: 30,
            },
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default SelectDocumentTypeModal;
