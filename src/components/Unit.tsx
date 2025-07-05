import React from 'react';
import { useLayout } from '../contexts/layout/LayoutProvider';
import './Unit.css';

interface UnitProps {
  children: React.ReactNode;
  background?: string;
  paddingLeft?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
  paddingRight?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
  paddingTop?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
  paddingBottom?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
  marginLeft?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
  marginRight?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
  marginTop?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
  marginBottom?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';
  justifyContent?: string;
  justifyItems?: string;
  alignContent?: string;
  alignItems?: string;
  justifySelf?: string;
  alignSelf?: string;
  layout?: string;
  flexDirection?: string;
  flexGrow?: '1' | '2' | '3' | '4' | '';
  flexShrink?: '1' | '2' | '3' | '';

  colSpan?: string;
  rowSpan?: string;
  gap?: string;
  className?: string;
}

const Unit: React.FC<UnitProps> = ({
  children,
  background,
  paddingLeft,
  paddingRight,
  paddingBottom,
  paddingTop,
  marginLeft,
  marginRight,
  marginBottom,
  marginTop,
  justifyContent,
  justifyItems,
  alignContent,
  alignItems,
  justifySelf,
  alignSelf,
  layout = '',
  flexDirection = '',
  flexGrow = '',
  flexShrink = '',
  colSpan,
  rowSpan,
  gap,
  className = '',
}) => {
  const { context } = useLayout();
  const unitClass = className
    ? className
    : context?.unit?.className
    ? `${context.unit.className}`
    : '';

  const unitLayout = layout
    ? layout
    : context?.unit?.layout
    ? `${context.unit.layout}`
    : '';

  const unitFlexDirection = flexDirection
    ? `flex-${flexDirection}`
    : context?.unit?.flexDirection
    ? `flex-${context.unit.flexDirection}`
    : '';

  const unitFlexGrow = flexGrow
    ? `flex-grow-${flexGrow}`
    : context?.unit?.flexGrow
    ? `flex-grow-${context.unit.flexGrow}`
    : '';

  const unitFlexShrink = flexShrink
    ? `flex-shrink-${flexShrink}`
    : context?.unit?.flexShrink
    ? `flex-shrink-${context.unit.flexShrink}`
    : '';

  const unitGap = gap
    ? `gap-${gap}`
    : context?.unit?.gap
    ? `gap-${context.unit.gap}`
    : '';

  const unitColSpan = colSpan
    ? colSpan
    : context?.unit?.colSpan
    ? `col-span-${context.unit.colSpan}`
    : '';
  const unitRowSpan = rowSpan
    ? rowSpan
    : context?.unit?.rowSpan
    ? `row-span-${context.unit.rowSpan}`
    : '';

  const unitJustifyContent = justifyContent
    ? `justify-content-${justifyContent}`
    : context?.unit?.justifyContent
    ? `justify-content-${context.unit.justifyContent}`
    : '';

  const unitJustifyItems = justifyItems
    ? justifyItems
    : context?.unit?.justifyItems
    ? `justify-items-${context.unit.justifyItems}`
    : '';

  const unitAlignContent = alignContent
    ? alignContent
    : context?.unit?.alignContent
    ? `align-content-${context.unit.alignContent}`
    : '';

  const unitAlignItems = alignItems
    ? alignItems
    : context?.unit?.alignItems
    ? `align-items-${context.unit.alignItems}`
    : '';

  const unitAlignSelf = alignSelf
    ? alignSelf
    : context?.unit?.alignSelf
    ? `align-self-${context.unit.alignSelf}`
    : '';
  const unitJustifySelf = justifySelf
    ? justifySelf
    : context?.unit?.justifySelf
    ? `justify-self-${context.unit.justifySelf}`
    : '';

  const unitPaddingLeft = paddingLeft
    ? `padding-left-${paddingLeft}`
    : context?.unit?.paddingLeft
    ? `padding-left-${paddingLeft}`
    : '';
  const unitPaddingRight = paddingRight
    ? `padding-right-${paddingRight}`
    : context?.unit?.paddingRight
    ? `padding-right-${paddingRight}`
    : '';
  const unitPaddingTop = paddingTop
    ? `padding-top-${paddingTop}`
    : context?.unit?.paddingTop
    ? `padding-top-${paddingTop}`
    : '';
  const unitPaddingBottom = paddingBottom
    ? `padding-bottom-${paddingBottom}`
    : context?.unit?.paddingBottom
    ? `padding-bottom-${paddingBottom}`
    : '';
  const unitMarginLeft = marginLeft
    ? `margin-left-${marginLeft}`
    : context?.unit?.marginLeft
    ? `padding-left-${marginLeft}`
    : '';
  const unitMarginRight = marginRight
    ? `margin-right-${marginRight}`
    : context?.unit?.marginRight
    ? `padding-right-${marginRight}`
    : '';
  const unitMarginTop = marginTop
    ? `margin-top-${marginTop}`
    : context?.unit?.marginTop
    ? `margin-top-${marginTop}`
    : '';
  const unitMarginBottom = marginBottom
    ? `margin-bottom-${marginBottom}`
    : context?.unit?.marginBottom
    ? `margin-bottom-${marginBottom}`
    : '';

  const unitBackground = background
    ? background
    : context?.unit?.background
    ? `background`
    : '';

  return (
    <div
      className={`unit ${unitLayout} ${unitFlexDirection} ${unitClass} ${unitGap} ${unitColSpan} ${unitRowSpan} ${unitAlignContent} ${unitAlignItems} ${unitJustifyContent} ${unitJustifyItems} ${unitAlignSelf} ${unitJustifySelf} ${unitPaddingLeft} ${unitPaddingRight} ${unitPaddingTop} ${unitPaddingBottom} ${unitMarginTop} ${unitMarginBottom} ${unitMarginLeft} ${unitMarginRight} ${unitBackground}`.trim()}
    >
      {children}
    </div>
  );
};

export default Unit;
