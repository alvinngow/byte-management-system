import { useMutation, useQuery } from '@apollo/client';
import axios from 'axios';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as AccountAvatarUpdate from '../graphql/frontend/mutations/AccountAvatarUpdateMutation';
import * as FileUpload from '../graphql/frontend/mutations/FileUploadMutation';
import * as Me from '../graphql/frontend/queries/MeQuery';
import Button from './Button';

const AvatarConfigurator: React.FC = function () {
  const { data: meData } = useQuery<Me.Data>(Me.Query);

  const [accountAvatarUpdate] = useMutation<
    AccountAvatarUpdate.Data,
    AccountAvatarUpdate.Variables
  >(AccountAvatarUpdate.Mutation);

  const [fileUpload] = useMutation<FileUpload.Data, FileUpload.Variables>(
    FileUpload.Mutation
  );

  const [file, setFile] = React.useState<File | null>(null);

  const [uploadedAvatar, setUploadedAvatar] = React.useState<string | null>(
    null
  );

  const handleUploadClick = React.useCallback<React.MouseEventHandler>(() => {
    async function run() {
      if (file == null) {
        return;
      }

      const { data: fileUploadData } = await fileUpload({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            contentType: file.type,
          },
        },
      });

      if (fileUploadData == null) {
        return;
      }

      await axios.put(fileUploadData.fileUpload.signedUrl, file);

      await accountAvatarUpdate({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            avatar: fileUploadData.fileUpload.fileName,
          },
        },
      });
    }

    run();
  }, [accountAvatarUpdate, file, fileUpload]);

  const handleRemoveClick = React.useCallback<React.MouseEventHandler>(() => {
    accountAvatarUpdate({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          avatar: null,
        },
      },
    });
  }, [accountAvatarUpdate]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFile(e.target.files?.[0] ?? null);
  };

  return (
    <details open>
      <summary>Avatar</summary>
      <input type="file" multiple={false} onChange={handleInputChange} />

      <Button onClick={handleUploadClick}>Upload</Button>
      <Button onClick={handleRemoveClick} disabled={meData?.me?.avatar == null}>
        Remove
      </Button>
    </details>
  );
};

export default AvatarConfigurator;
