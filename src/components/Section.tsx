import React from 'react';
import './Section.css';
import { useLayout } from '../contexts/layout/LayoutProvider';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  layout?:
    | 'flex'
    | 'grid'
    | 'wrap'
    | 'flex-vertical'
    | 'appointment-grid'
    | 'grid-calendar'
    | '';
  alignContent?: string;
  alignItems?: string;
  justifyContent?: string;
  justifyItems?: string;
  width?: string;
  gap?: string;
  background?: string;
  padding?: string;
}

const Section = ({
  id,
  children,
  layout,
  alignContent,
  alignItems,
  justifyContent,
  justifyItems,
  width,
  gap,
  background,
}: SectionProps) => {
  const { context } = useLayout();
  const sectionClass = context?.section?.className || '';

  const sectionWidth = width
    ? width
    : context?.section?.width
    ? context.section.width
    : '';

  // prop level layout takes precedence over context layout

  const sectionLayout = layout
    ? layout
    : context?.section?.layout
    ? context.section.layout
    : '';

  const sectionPositioning = context?.section?.positioning || '';

  // aligns section items in y-axis.

  const sectionAlignContent = alignContent
    ? alignContent
    : context?.section?.alignContent
    ? `align-content-${context.section.alignContent}`
    : '';

  const sectionAlignItems = alignItems
    ? alignItems
    : context?.section?.alignItems
    ? `align-items-${context.section.alignItems}`
    : '';

  // aligns section items in x-axis.

  const sectionJustifyContent = justifyContent
    ? `justify-content-${justifyContent}`
    : context?.section?.justifyContent
    ? `justify-content-${context.section.justifyContent}`
    : '';
  const sectionJustifyItems = justifyItems
    ? `justify-items-${justifyItems}`
    : context?.section?.justifyItems
    ? `justify-items-${context.section.justifyItems}`
    : '';

  // gap is used to determine the spacing between items in a grid or flex layout.

  const sectionGap = gap
    ? `gap-${gap}`
    : context?.section?.gap
    ? `gap-${context.section.gap}`
    : '';

  const sectionAlignSelf = context?.section?.alignSelf
    ? `align-self-${context.section.alignSelf}`
    : '';
  const sectionJustifySelf = context?.section?.justifySelf
    ? `justify-self-${context.section.justifySelf}`
    : '';

  // colSpan and rowSpan are used to determine how many columns and rows the section should span in a grid layout.

  const sectionColSpan = context?.section?.colSpan
    ? `col-span-${context.section.colSpan}`
    : '';
  const sectionRowSpan = context?.section?.rowSpan
    ? `row-span-${context.section.rowSpan}`
    : '';

  const sectionBackground = background
    ? `bg-${background}`
    : context?.section?.background
    ? `bg-${context.section.background}`
    : '';
  const padding = context?.section?.padding || '';

  return (
    <section
      id={id}
      className={`section ${sectionWidth} ${sectionBackground} ${padding} ${sectionLayout} ${sectionClass} ${sectionPositioning} ${sectionColSpan} ${sectionRowSpan} ${sectionAlignSelf} ${sectionJustifySelf} ${sectionAlignItems} ${sectionAlignContent} ${sectionJustifyItems} ${sectionJustifyContent} ${sectionGap}`.trim()}
    >
      {children}
    </section>
  );
};

export default Section;
