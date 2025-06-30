import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import Button from '../Button';
const DropDownItem = ({ route, onClick, itemNo, }) => {
    const link = route === 'Home' ? '/' : `/${route.toLowerCase()}`;
    const variant = route === 'Home' ? 'primary' : 'outline';
    return (_jsx("div", { className: itemNo, children: _jsx(Link, { to: link, children: _jsx(Button, { variant: variant, onClick: onClick, intent: "dropdown", children: route }) }) }));
};
export default DropDownItem;
