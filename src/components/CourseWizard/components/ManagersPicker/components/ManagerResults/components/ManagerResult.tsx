import { TrashIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import React from 'react';

import { User } from '../../../../../../../../gen/graphql/resolvers';

interface Props {
  manager: User;
  focused: boolean;
  onManagerAdded: (userId: string) => void;
}

const ManagerResult: React.FC<Props> = function (props) {
  const { manager, focused, onManagerAdded } = props;

  return (
    <div
      className={classNames(
        'inline-flex w-full cursor-pointer items-center bg-white px-2 py-2 hover:bg-brand-hover',
        {
          'bg-brand-hover': focused,
        }
      )}
      onClick={() => onManagerAdded(manager.id)}
    >
      <span className="mr-2.5 h-10 w-10 rounded-full bg-gray-400"></span>
      <span className="body1">
        {manager.firstName} {manager.lastName}
      </span>
    </div>
  );
};

export default ManagerResult;
