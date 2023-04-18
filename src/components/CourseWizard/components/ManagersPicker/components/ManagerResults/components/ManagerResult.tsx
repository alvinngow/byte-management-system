import { User } from '@bims/graphql/schema';
import { TrashIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import React from 'react';

import Avatar from '../../../../../../Avatar';

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
        'inline-flex cursor-pointer items-center bg-white px-2 py-2 hover:bg-brand-hover',
        {
          'bg-brand-hover': focused,
        }
      )}
      onClick={() => onManagerAdded(manager.id)}
    >
      <Avatar className="mr-2 h-6 w-6 py-1 px-1 text-xs" user={manager} />
      <span className="body1">
        {manager.firstName} {manager.lastName}
      </span>
    </div>
  );
};

export default ManagerResult;
