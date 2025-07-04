// Portfolio Site Initialization

import React, { createContext, useContext, ReactNode } from 'react';

interface LayoutUnitSettings {
  className?: string;
  layout?: string;
  colSpan?: string;
  rowSpan?: string;
  justifyContent?: string;
  justifyItems?: string;
  alignContent?: string;
  alignItems?: string;
  justifySelf?: string;
  alignSelf?: string;
  gap?: string;
  flexDirection?: string;

  paddingLeft?: 'sm' | 'md' | 'lg' | 'xl' | '';
  paddingRight?: 'sm' | 'md' | 'lg' | 'xl' | '';
  paddingTop?: 'sm' | 'md' | 'lg' | 'xl' | '';
  paddingBottom?: 'sm' | 'md' | 'lg' | 'xl' | '';

  marginLeft?: 'sm' | 'md' | 'lg' | 'xl' | '';
  marginRight?: 'sm' | 'md' | 'lg' | 'xl' | '';
  marginTop?: 'sm' | 'md' | 'lg' | 'xl' | '';
  marginBottom?: 'sm' | 'md' | 'lg' | 'xl' | '';

  background?: string;
}

interface LayoutSectionSettings {
  layout?: string;
  width?: string;
  positioning?: string;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
  justifyContent?: string;
  justifyItems?: string;
  alignContent?: string;
  alignItems?: string;
  justifySelf?: string;
  alignSelf?: string;
  gap?: string;
  background?: string;
  flexDirection?: string;
  padding?: string;
}

interface LayoutContextProps {
  layout: string;
  spacing?: string;
  positioning?: string;
  context: {
    unit?: LayoutUnitSettings;
    section?: LayoutSectionSettings;
    [key: string]: any;
  };
}

// Layout Context Setup
export const LayoutContext = createContext<LayoutContextProps>({
  layout: 'flex',
  spacing: '',
  positioning: '',
  context: {},
});

interface LayoutProviderProps extends Partial<LayoutContextProps> {
  children: ReactNode;
}

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  layout = 'flex',
  spacing = '',
  positioning = '',
  context = {},
}) => {
  return (
    <LayoutContext.Provider value={{ layout, spacing, positioning, context }}>
      <div>{children}</div>
    </LayoutContext.Provider>
  );
};
