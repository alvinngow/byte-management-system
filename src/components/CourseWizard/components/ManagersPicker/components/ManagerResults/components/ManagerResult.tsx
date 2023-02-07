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
      className={classNames('flex items-center gap-x-2', {
        'bg-brand-hover': focused,
      })}
      onClick={() => onManagerAdded(manager.id)}
    >
      <button className="inline-block h-7 w-7 rounded-full bg-gray-400"></button>
      <span>
        {manager.firstName} {manager.lastName}
      </span>
    </div>
  );
};

export default ManagerResult;
