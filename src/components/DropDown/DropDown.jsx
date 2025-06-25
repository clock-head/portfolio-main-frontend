import React from 'react';
import DropDownItem from './DropDownItem';

const DropDown = ({ navDropDown, toggleNavMobile, currentLocation }) => {
  const location =
    currentLocation.charAt(0).toUpperCase() + currentLocation.slice(1);

  console.log(location);

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
