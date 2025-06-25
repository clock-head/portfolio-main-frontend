import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const DropDownItem = ({ route, onClick, itemNo }) => {
  const link = route === 'Home' ? '/' : `/${route.toLowerCase()}`;
  const variant = route === 'Home' ? 'primary' : 'outline';

  return (
    <div className={itemNo}>
      <Link to={link}>
        <Button variant={variant} onClick={onClick} intent="dropdown">
          {route}
        </Button>
      </Link>
    </div>
  );
};

export default DropDownItem;
