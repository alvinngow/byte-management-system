import React from 'react';

import NavBar from '../../components/NavBar';
import NavHeader from '../../components/NavHeader';

const UserPageLayout: React.FC<React.PropsWithChildren> = function (props) {
  return (
    <NavBar>
      <NavHeader />
      {props.children}
    </NavBar>
  );
};

export default UserPageLayout;
