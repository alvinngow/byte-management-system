import { useQuery } from '@apollo/client';
import { UserRole } from '@bims/graphql/schema';
import React from 'react';

import * as UsersQuery from '../../../../graphql/frontend/queries/UsersQuery';
import useDebounce from '../../../../hooks/useDebounce';
import Input from '../../../Input';
import ManagerChip from './components/ManagerChip';
import ManagerResults from './components/ManagerResults';

interface Props {
  managerUserIds: Set<string>;
  onManagerAdded: (userId: string) => void;
  onManagerRemoved: (userId: string) => void;
  isRequiredField?: Boolean;
}

/**
 * FIXME: Search doesn't work
 */

const ManagersPicker: React.FC<Props> = function (props) {
  const { managerUserIds, onManagerAdded, onManagerRemoved, isRequiredField } =
    props;

  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [isOpen, setIsOpen] = React.useState(false);

  const variables = React.useMemo<UsersQuery.Variables>(() => {
    return {
      filter: {
        role: [UserRole.CommitteeMember],
        searchTerm: debouncedSearchTerm,
      },
    };
  }, [debouncedSearchTerm]);

  const { data, loading, refetch } = useQuery<
    UsersQuery.Data,
    UsersQuery.Variables
  >(UsersQuery.Query, {
    variables,
  });

  /**
   * WORKAROUND: Apollo Client doesn't refetch properly when `debouncedSearchTerm` changes
   */
  React.useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, refetch]);

  const handleInputFocus = React.useCallback<
    React.FocusEventHandler<HTMLInputElement>
  >(() => {
    setIsOpen(true);
  }, []);

  const handleInputChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleInputKeyDown = React.useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    (e) => {
      switch (e.key) {
        case 'ArrowUp': {
          e.preventDefault();
          setFocusedIndex(Math.max(0, focusedIndex - 1));
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          const edgesLength = data?.users?.edges?.length ?? 0;

          setFocusedIndex(Math.min(edgesLength - 1, focusedIndex + 1));
          break;
        }
        case 'Enter': {
          const focusedUserId =
            data?.users?.edges?.[focusedIndex]?.node?.id ?? null;

          if (focusedUserId != null) {
            onManagerAdded(focusedUserId);
            setFocusedIndex(-1);
          }
          break;
        }
        case 'Escape': {
          setIsOpen(false);
          break;
        }
      }
    },
    [data?.users?.edges, focusedIndex, onManagerAdded]
  );

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    const edgesLength = data?.users?.edges?.length ?? 0;

    setFocusedIndex(edgesLength > 0 ? 0 : -1);
  }, [data]);

  const userEdges = React.useMemo(() => {
    const edges = data?.users?.edges ?? [];

    return edges.filter((edge) => !managerUserIds.has(edge.node.id));
  }, [data, managerUserIds]);

  return (
    <div className="relative flex flex-col">
      <div className="flex items-center">
        <Input
          className="grow"
          type="text"
          label="Trainer"
          placeholder="Trainer's Name"
          value={searchTerm}
          isRequiredField={isRequiredField}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0"
          onClick={handleBackdropClick}
        />
      )}
      {isOpen && (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50 flex w-full flex-col gap-y-0.5 overflow-hidden rounded-b-lg bg-gray-300 shadow-lg">
            <ManagerResults
              userEdges={userEdges}
              focusedIndex={focusedIndex}
              loading={loading}
              onManagerAdded={onManagerAdded}
            />
          </div>
        </div>
      )}
      <div className="mt-2 inline-flex gap-x-2.5">
        {Array.from(managerUserIds).map((userId) => (
          <ManagerChip
            key={userId}
            userId={userId}
            onManagerRemoved={onManagerRemoved}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagersPicker;
