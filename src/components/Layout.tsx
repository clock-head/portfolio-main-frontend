import React from 'react';
import { LayoutProvider } from '../contexts/layout/LayoutProvider';
import './Layout.css'; // optional CSS module or global

interface LayoutProps {
  children: React.ReactNode;
  layout?: string;
  spacing?: string;
  positioning?: string;
  justifyContent?: string;
  justifyItems?: string;
  alignItems?: string;
  alignContent?: string;
  background?: string;
  context?: Record<string, any>;
}

const Layout: React.FC<LayoutProps> = ({
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
