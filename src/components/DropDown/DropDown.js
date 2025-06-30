import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import DropDownItem from './DropDownItem';
import { useLocation } from 'react-router-dom';
const DropDown = ({ navDropDown, toggleNavMobile, }) => {
    const currentLocation = useLocation();
    const loc = currentLocation.pathname === '/' ? 'home' : currentLocation.pathname;
    const location = loc.charAt(0).toUpperCase() + loc.slice(1);
    return (_jsxs(_Fragment, { children: [!navDropDown && (_jsx(DropDownItem, { route: location, onClick: toggleNavMobile })), navDropDown && (_jsxs(_Fragment, { children: [_jsx(DropDownItem, { route: "Home", itemNo: "item-2", onClick: toggleNavMobile }), _jsx(DropDownItem, { route: "Projects", itemNo: "item-3", onClick: toggleNavMobile }), _jsx(DropDownItem, { route: "Calendar", itemNo: "item-1", onClick: toggleNavMobile }), _jsx(DropDownItem, { route: "Contact", itemNo: "item-4", onClick: toggleNavMobile })] }))] }));
};
export default DropDown;
