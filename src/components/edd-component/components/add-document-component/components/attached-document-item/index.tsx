import { DocumentFileData } from '../../../../../../types';
import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import useMergeStyles from './styles';
import { AttachIcon, InformationIcon, TrashIcon } from '../../../../../../assets/icons';
import { AccountOriginationContext } from '../../../../../../context/onboarding-context';

export type AttachedDocumentItemProps = {
  document: DocumentFileData;
  isError?: boolean;
  style?: AttachedDocumentItemStyles;
  onDelete: () => void;
};

export type AttachedDocumentItemStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  documentNameStyle?: StyleProp<TextStyle>;
  progressContainerStyle?: StyleProp<ViewStyle>;
  progressFilledStyle?: StyleProp<ViewStyle>;
};

const AttachedDocumentItem = ({
  style,
  document,
  onDelete,
  isError,
}: AttachedDocumentItemProps) => {
  const styles: AttachedDocumentItemStyles = useMergeStyles(style);
  const { uploadDocumentPercent } = useContext(AccountOriginationContext);

  const color = isError ? '#D32F2F' : uploadDocumentPercent > 0 ? '#7F7B82' : '#FF9800';

  return (
    <View style={styles.containerStyle}>
      {isError ? (
        <InformationIcon width={20} height={20} color="#D32F2F" />
      ) : (
        <AttachIcon width={20} height={20} />
      )}
      <Text style={[styles.documentNameStyle, { color }]}>{document.name}</Text>
      {uploadDocumentPercent > 0 ? (
        <View style={styles.progressContainerStyle}>
          <View
            style={[
              styles.progressFilledStyle,
              {
                width: `${uploadDocumentPercent}%`,
              },
            ]}
          />
        </View>
      ) : (
        <TouchableOpacity activeOpacity={0.8} onPress={onDelete}>
          <TrashIcon width={20} height={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AttachedDocumentItem;
