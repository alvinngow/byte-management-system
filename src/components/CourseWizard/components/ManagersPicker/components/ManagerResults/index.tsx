import React from 'react';

import { UserEdge } from '../../../../../../../gen/graphql/resolvers';
import Spinner from '../../../../../Spinner';
import ManagerResult from './components/ManagerResult';

interface Props {
  userEdges: UserEdge[];
  loading: boolean;
  focusedIndex: number;
  onManagerAdded: (userId: string) => void;
}

const ManagerResults: React.FC<Props> = function (props) {
  const { userEdges, focusedIndex, loading, onManagerAdded } = props;

  return (
    <div className="flex max-h-72 flex-col gap-y-px overflow-y-scroll bg-gray-300">
      {loading && <Spinner />}
      {userEdges.map((edge, index) => (
        <ManagerResult
          key={edge.node.id}
          manager={edge.node}
          focused={focusedIndex === index}
          onManagerAdded={onManagerAdded}
        />
      ))}
    </div>
  );
};

export default ManagerResults;
