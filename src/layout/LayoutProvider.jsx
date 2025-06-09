// Portfolio Site Initialization

import React, { createContext, useContext } from 'react';

// Layout Context Setup
export const LayoutContext = createContext({
  layout: 'flex',
  spacing: '',
  positioning: '',
  context: {},
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({
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
