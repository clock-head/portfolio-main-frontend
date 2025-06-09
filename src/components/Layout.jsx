import React from 'react';
import { LayoutProvider } from '../layout/LayoutProvider';
import './Layout.css'; // optional CSS module or global

const Layout = ({
  children,
  layout,
  spacing,
  positioning,
  justifyContent,
  justifyItems,
  alignItems,
  alignContent,
  context,
  background,
}) => {
  const layoutJustifyContent = justifyContent
    ? `justify-content-${justifyContent}` // e.g. justify-content-center
    : ''; // default to empty string

  const layoutJustifyItems = justifyItems
    ? `justify-items-${justifyItems}` // e.g. justify-items-center
    : ''; // default to empty string

  const layoutAlignContent = alignContent
    ? `align-content-${alignContent}` // e.g. align-content-center
    : ''; // default to empty string

  const layoutAlignItems = alignItems
    ? `align-items-${alignItems}` // e.g. align-items-center
    : ''; // default to empty string

  return (
    <LayoutProvider
      layout={layout || 'flex'}
      spacing={spacing || 'gap-md'}
      positioning={positioning || ''}
      context={context || {}}
    >
      <div
        className={`layout-root ${background} ${layout} ${spacing} ${positioning} ${layoutAlignContent} ${layoutAlignItems} ${layoutJustifyContent} ${layoutJustifyItems}`.trim()}
      >
        {children}
      </div>
    </LayoutProvider>
  );
};

export default Layout;
