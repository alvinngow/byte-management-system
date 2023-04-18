import { useMutation, useQuery } from '@apollo/client';
import axios from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as AccountAvatarUpdate from '../graphql/frontend/mutations/AccountAvatarUpdateMutation';
import * as FileUpload from '../graphql/frontend/mutations/FileUploadMutation';
import { MeQueryDocument } from '../graphql/frontend/queries/MeQuery.generated';
import Button from './Button';

const BACKGROUND_COLORS = [
  'bg-pink-600',
  'bg-sky-600',
  'bg-lime-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-violet-500',
  'bg-red-500',
  'bg-indigo-500',
];

interface Prop {
  submitType?: string | null;
}

const AvatarConfigurator: React.FC<Prop> = function (prop) {
  const { submitType } = prop;
  const { data: meData } = useQuery(MeQueryDocument);

  const [accountAvatarUpdate] = useMutation<
    AccountAvatarUpdate.Data,
    AccountAvatarUpdate.Variables
  >(AccountAvatarUpdate.Mutation);

  const firstName = meData?.me?.firstName;
  const lastName = meData?.me?.lastName;
  const avatarUrl = meData?.me?.avatar;
  const inputElement = React.useRef<HTMLInputElement>(null);

  const [fileUpload] = useMutation<FileUpload.Data, FileUpload.Variables>(
    FileUpload.Mutation
  );

  const [file, setFile] = React.useState<File | null>(null);

  const [uploadedAvatar, setUploadedAvatar] = React.useState<string | null>(
    null
  );

  const randomBgClass = useMemo(() => {
    return BACKGROUND_COLORS[
      Math.floor(Math.random() * BACKGROUND_COLORS.length)
    ];
  }, []);

  const handleUploadClick = React.useCallback(() => {
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
    if (e!.currentTarget!.files![0]) {
      const objectUrl = URL.createObjectURL(e!.currentTarget!.files![0]);
      setUploadedAvatar(objectUrl!);
    } else {
      setUploadedAvatar(null);
    }
  };

  useEffect(() => {
    if (submitType === 'submit') {
      handleUploadClick();
    }
  }, [submitType, handleUploadClick]);

  return (
    <>
      <button className="relative flex items-center gap-2.5 rounded-xl p-1">
        <input
          type="file"
          multiple={false}
          onChange={handleInputChange}
          className="hidden"
          ref={inputElement}
        />
        <span
          className="flex h-10 w-10"
          onClick={() => inputElement.current?.click()}
        >
          {avatarUrl ? (
            <Image
              className="h-full grow self-center rounded-full object-contain"
              src={avatarUrl}
              alt="profile placeholder"
              width={24}
              height={24}
            />
          ) : uploadedAvatar ? (
            <Image
              className="h-full grow self-center rounded-full object-contain"
              src={uploadedAvatar}
              alt="profile placeholder"
              width={24}
              height={24}
            />
          ) : (
            <span
              className={classNames(
                'avatarLetter inline-flex h-full grow items-center justify-center rounded-full text-center text-white',
                randomBgClass
              )}
            >
              {firstName?.[0]}
              {lastName?.[0]}
            </span>
          )}
        </span>
        <span
          onClick={() => inputElement.current?.click()}
          className="pl-2 text-blue-500"
        >
          Add Profile Picture
        </span>
        {meData?.me?.avatar != null && (
          <span onClick={handleRemoveClick} className="pl-2 text-blue-500">
            Remove Picture
          </span>
        )}
      </button>
      <span className="hidden">
        <Button
          onClick={handleRemoveClick}
          disabled={meData?.me?.avatar == null}
        >
          Remove
        </Button>
      </span>
    </>
  );
};

export default AvatarConfigurator;
