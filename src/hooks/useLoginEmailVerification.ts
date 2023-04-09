import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as AccountVerifyUpdate from '../graphql/frontend/mutations/AccountVerifyUpdateMutation';
import * as EmailVerification from '../graphql/frontend/queries/EmailVerificationQuery';

export default function useLoginEmailVerification() {
  const router = useRouter();

  const { data } = useQuery<
    EmailVerification.Data,
    EmailVerification.Variables
  >(EmailVerification.Query, {
    variables: {
      id: router.query.verificationCode?.toString()!,
    },
    skip: router.query.verificationCode == null,
  });

  const [accountVerifyUpdate] = useMutation<
    AccountVerifyUpdate.Data,
    AccountVerifyUpdate.Variables
  >(AccountVerifyUpdate.Mutation);

  const [isVerifiedModalOpen, setIsVerifiedModalOpen] = React.useState(false);

  React.useEffect(() => {
    async function run() {
      const emailVerificationId = data?.emailVerification?.id ?? null;

      if (emailVerificationId == null) {
        return;
      }

      try {
        await accountVerifyUpdate({
          variables: {
            input: {
              clientMutationId: uuidv4(),
              emailVerificationId,
            },
          },
        });

        setIsVerifiedModalOpen(true);
      } catch {}
    }

    run();
  }, [data, accountVerifyUpdate]);

  const closeVerifiedModal = React.useCallback(() => {
    setIsVerifiedModalOpen(false);
  }, []);

  return {
    isVerifiedModalOpen,
    closeVerifiedModal,
  };
}
