import React from 'react';
import DropDownItem from './DropDownItem';
import { useLocation } from 'react-router-dom';

interface DropDownProps {
  navDropDown: boolean;
  toggleNavMobile: () => void;
}

const DropDown: React.FC<DropDownProps> = ({
  navDropDown,
  toggleNavMobile,
}) => {
  const currentLocation = useLocation();
  const loc =
    currentLocation.pathname === '/' ? 'home' : currentLocation.pathname;

  const currentLoc = loc === 'home' ? 'home' : loc.slice(1);
  const location = currentLoc.charAt(0).toUpperCase() + currentLoc.slice(1);

  return (
    <>
      {!navDropDown && (
        <DropDownItem route={location} onClick={toggleNavMobile}></DropDownItem>
      )}

      {navDropDown && (
        <>
          <DropDownItem
            route="Home"
            itemNo="item-2"
            onClick={toggleNavMobile}
          ></DropDownItem>
          <DropDownItem
            route="Projects"
            itemNo="item-3"
            onClick={toggleNavMobile}
          ></DropDownItem>
          <DropDownItem
            route="Calendar"
            itemNo="item-1"
            onClick={toggleNavMobile}
          ></DropDownItem>
          <DropDownItem
            route="Contact"
            itemNo="item-4"
            onClick={toggleNavMobile}
          ></DropDownItem>
        </>
      )}
    </>
  );
};

export default DropDown;
