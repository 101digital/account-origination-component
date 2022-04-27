import { BackIcon } from '../../../../assets/icons';
import { AccountOriginationContext } from '../../../../context/onboarding-context';
import { filter, isEmpty, values } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { BottomSheet, Button, KeyboardSpace, ThemeContext } from 'react-native-theme-component';
import { EBank, GroupEBank } from '../../../../types';
import ItemEBankComponent, { ItemEBankComponentStyles } from './components/item-ebank-component';
import SearchField, { SearchFieldStyles } from './components/search-field';
import useMergeStyles from './styles';

export type SelectEBankComponentProps = {
  style?: SelectEBankComponentStyles;
  eBankId?: string;
  isVisible: boolean;
  onSelected: (eBank: EBank) => void;
  onClose: () => void;
};

export type SelectEBankComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  emptyResultTextStyle?: StyleProp<TextStyle>;
  eBankListStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  loadingIndicatorStyle?: StyleProp<ViewStyle>;
  searchFieldComponentStyle?: SearchFieldStyles;
  itemEbankComponentStyle?: ItemEBankComponentStyles;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
};

const SelectEBankComponent = ({
  style,
  onSelected,
  isVisible,
  onClose,
  eBankId,
}: SelectEBankComponentProps) => {
  const styles: SelectEBankComponentStyles = useMergeStyles(style);
  const { eBanks } = useContext(AccountOriginationContext);
  const { i18n, colors } = useContext(ThemeContext);
  const [groupEBanks, setGroupEBank] = useState<GroupEBank[]>([]);
  const [selectedEBank, setSelectedEBank] = useState<EBank | undefined>(undefined);

  useEffect(() => {
    return () => {
      setSelectedEBank(undefined);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isEmpty(eBankId)) {
      setSelectedEBank(eBanks.find((eb) => eb.id === eBankId));
    }
  }, [eBankId]);

  useEffect(() => {
    setGroupEBank(_handleSearch());
    return () => {
      setGroupEBank(_handleSearch());
    };
  }, [eBanks]);

  const _handleSearch = (key?: string) => {
    let _banks = isEmpty(key)
      ? eBanks
      : filter(eBanks, (b) => b.name.toLowerCase().includes(key!.toLowerCase()));
    const _groups: GroupEBank[] = values(
      _banks
        .map((n) => ({
          ...n,
          section: n.name === 'UnionBank' ? 'Featured' : n.name,
        }))
        .sort((a: EBank, b: EBank) => {
          return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        })
        .reduce((r: any, c: EBank) => {
          let section = c.name === 'UnionBank' ? 'Featured' : c.name[0].toUpperCase();
          if (!r[section]) {
            r[section] = { section, items: [c] };
          } else {
            r[section].items.push(c);
          }
          return r;
        }, {})
    );
    const _featuredIndex = _groups.findIndex((g) => g.section === 'Featured');
    if (_featuredIndex !== -1) {
      return [
        _groups[_featuredIndex],
        ..._groups.slice(0, _featuredIndex),
        ..._groups.slice(_featuredIndex + 1),
      ];
    }
    return _groups;
  };

  return (
    <BottomSheet
      useSafeArea={false}
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{
        containerStyle: styles.containerStyle,
        contentContainerStyle: {
          flex: 1,
          justifyContent: 'flex-start',
        },
      }}
    >
      <SafeAreaView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={styles.backButtonContainerStyle}
        >
          {<BackIcon width={17} height={12} />}
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.headerTitleStyle}>
          {i18n?.t('edd_component.lbl_select_bank_header') ?? 'List of banks'}
        </Text>
        <Text style={styles.subTitleStyle}>
          {i18n?.t('edd_component.lbl_select_bank_subheader') ?? 'Select a bank.'}
        </Text>
        <SearchField
          onSearch={(key: string) => {
            setGroupEBank(_handleSearch(key));
          }}
          placeholder={i18n?.t('edd_component.plh_search_bank') ?? 'Search for a bank'}
        />
        {isEmpty(groupEBanks) ? (
          <Text style={styles.emptyResultTextStyle}>
            {i18n?.t('edd_component.msg_no_result') ?? 'No results found.'}
          </Text>
        ) : (
          <KeyboardAwareFlatList
            keyExtractor={(item) => item.section}
            data={groupEBanks}
            keyboardShouldPersistTaps="handled"
            style={styles.eBankListStyle}
            showsVerticalScrollIndicator={false}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            renderItem={({ item }) => {
              return (
                <>
                  <Text style={styles.sectionTextStyle}>{item.section}</Text>
                  {item.items.map((ebank: EBank) => (
                    <ItemEBankComponent
                      key={ebank.id}
                      eBank={ebank}
                      isSelected={selectedEBank?.id === ebank.id}
                      onPressed={() => setSelectedEBank(ebank)}
                      style={styles.itemEbankComponentStyle}
                    />
                  ))}
                </>
              );
            }}
          />
        )}
        <KeyboardSpace style={styles.footerContainerStyle}>
          <Button
            disabled={selectedEBank === undefined}
            onPress={() => {
              if (selectedEBank) {
                onSelected(selectedEBank);
              }
            }}
            label={i18n?.t('edd_component.btn_select') ?? 'Select'}
            disableColor={colors.secondaryButtonColor}
          />
        </KeyboardSpace>
      </View>
    </BottomSheet>
  );
};

export default SelectEBankComponent;
