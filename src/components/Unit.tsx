import React from 'react';
import { useLayout } from '../contexts/layout/LayoutProvider';
import './Unit.css';

interface UnitProps {
  children: React.ReactNode;
  background?: string;
  padding?: string;
  justifyContent?: string;
  justifyItems?: string;
  alignContent?: string;
  alignItems?: string;
  justifySelf?: string;
  alignSelf?: string;
  layout?: string;
  flexDirection?: string;
  colSpan?: string;
  rowSpan?: string;
  gap?: string;
  className?: string;
}

const Unit: React.FC<UnitProps> = ({
  children,
  background,
  padding,
  justifyContent,
  justifyItems,
  alignContent,
  alignItems,
  justifySelf,
  alignSelf,
  layout = '',
  flexDirection = '',
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

  return (
    <div
      className={`unit ${unitLayout} ${unitFlexDirection} ${unitClass} ${unitGap} ${unitColSpan} ${unitRowSpan} ${unitAlignContent} ${unitAlignItems} ${unitJustifyContent} ${unitJustifyItems} ${unitAlignSelf} ${unitJustifySelf}`.trim()}
    >
      {children}
    </div>
  );
};

export default Unit;
