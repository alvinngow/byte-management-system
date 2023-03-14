import React from 'react';

import NavBar from '../../components/NavBar';
import NavHeader from '../../components/NavHeader';

const AppLayout: React.FC<React.PropsWithChildren> = function (props) {
  return (
    <NavBar>
      <NavHeader />
      <div className="mx-5 sm:mx-14 xl:mx-auto xl:w-11/12 xxl:w-4/5">
        {props.children}
      </div>
    </NavBar>
  );
};

export default AppLayout;
