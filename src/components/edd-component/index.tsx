import { isEmpty } from 'lodash';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BackIcon } from '../../assets/icons';
// import { OnboardingContext } from '../../context/onboarding-context';
import { AccountOriginationContext } from "../../context/onboarding-context";

import AddBankComponent, { AddBankComponentStyles } from './components/add-bank-component';
import { EBankData } from './components/add-bank-component/model';
import AddCompanyComponent, { AddCompanyComponentStyles } from './components/add-company-component';
import AddDocumentComponent, {
  AddDocumentComponentStyles,
} from './components/add-document-component';
import { DocumentData } from './components/add-document-component/model';
import OngoingVerificationComponent, {
  OngoingVerificationComponentStyles,
} from './components/ongoing-verification-component';
import SummaryComponent, { SummaryComponentStyles } from './components/summary-component';
import useMergeStyles from './styles';

export type EDDComponentProps = {
  applicationId: string;
  style?: EDDComponentStyles;
  backIcon?: ReactNode;
  onBack: () => void;
  onNext: () => void;
};

export type EDDComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  summaryComponentStyle?: SummaryComponentStyles;
  addDocumentComponentStyle?: AddDocumentComponentStyles;
  addBankComponentStyle?: AddBankComponentStyles;
  addCompanyComponentStyle?: AddCompanyComponentStyles;
  onGogingVerificationComponentStyle?: OngoingVerificationComponentStyles;
};

enum EDDStep {
  summary = 'summary',
  addDocument = 'add-document',
  addBank = 'add-bank',
  addCompany = 'add-company',
  ongoingVerification = 'ongoing-verification',
}

const EDDComponent = ({ style, backIcon, onBack, applicationId, onNext }: EDDComponentProps) => {
  const styles: EDDComponentStyles = useMergeStyles(style);
  const [step, setStep] = useState(EDDStep.summary);
  const { eBanks, getEBank } = useContext(AccountOriginationContext);
  const [documentData, setDocumentData] = useState<DocumentData | undefined>(undefined);
  const [eBanksData, setEBanksData] = useState<EBankData[] | undefined>(undefined);

  useEffect(() => {
    if (isEmpty(eBanks)) {
      getEBank();
    }
  }, []);

  const _handleBack = () => {
    if (step === EDDStep.summary) {
      return onBack();
    }
    if (step === EDDStep.addDocument) {
      return setStep(EDDStep.summary);
    }
    if (step === EDDStep.addBank) {
      return setStep(EDDStep.addDocument);
    }
    if (step === EDDStep.addCompany) {
      return setStep(EDDStep.addBank);
    }
  };

  console.log('step ',step);

  return (
    <View style={styles.containerStyle}>
      {step === EDDStep.ongoingVerification ? (
        <OngoingVerificationComponent
          onNext={onNext}
          style={styles.onGogingVerificationComponentStyle}
        />
      ) : (
        <>
          <SafeAreaView>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={_handleBack}
              style={styles.backButtonContainerStyle}
            >
              {backIcon ?? <BackIcon width={17} height={12} />}
            </TouchableOpacity>
          </SafeAreaView>
          {step === EDDStep.summary && (
            <SummaryComponent
              onNext={() => {
                setStep(EDDStep.addDocument);
              }}
              style={styles.summaryComponentStyle}
            />
          )}
          {step === EDDStep.addDocument && (
            <AddDocumentComponent
              initValue={documentData}
              applicationId={applicationId}
              onSaved={(data) => {
                setDocumentData(data);
                setStep(EDDStep.addBank);
              }}
              style={styles.addDocumentComponentStyle}
            />
          )}
          {step === EDDStep.addBank && (
            <AddBankComponent
              applicationId={applicationId}
              initValue={eBanksData}
              onSaved={(data) => {
                setEBanksData(data);
                setStep(EDDStep.addCompany);
              }}
              style={styles.addBankComponentStyle}
            />
          )}
          {step === EDDStep.addCompany && eBanksData && (
            <AddCompanyComponent
              applicationId={applicationId}
              eBankData={eBanksData}
              onSaved={() => {
                setStep(EDDStep.ongoingVerification);
              }}
              style={styles.addCompanyComponentStyle}
            />
          )}
        </>
      )}
    </View>
  );
};

export default EDDComponent;
