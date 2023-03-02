import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as LogoutMutation from '../graphql/frontend/mutations/LogoutMutation';

const LogoutPage: NextPage = function () {
  const [logout] = useMutation<LogoutMutation.Data, LogoutMutation.Variables>(
    LogoutMutation.Mutation
  );

  const router = useRouter();

  React.useEffect(() => {
    logout({
      variables: {
        input: {
          clientMutationId: uuidv4(),
        },
      },
    }).then(() => {
      router.reload();
    });

    router.replace('/');
  }, [logout, router]);

  return null;
};

export default LogoutPage;
