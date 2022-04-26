import React, { ReactNode } from "react";
import {
  useAccountOriginationContextValue,
  AccountOriginationContext
} from "./onboarding-context";

export type AccountOriginationProviderProps = {
  children: ReactNode;
};

const AccountOriginationProvider = (props: AccountOriginationProviderProps) => {
  const { children } = props;
  const onboardingContextData = useAccountOriginationContextValue();

  return (
    <AccountOriginationContext.Provider value={onboardingContextData}>
      {children}
    </AccountOriginationContext.Provider>
  );
};

export default AccountOriginationProvider;
