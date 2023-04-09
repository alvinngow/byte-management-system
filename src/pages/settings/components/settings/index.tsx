import { useMutation, useQuery } from '@apollo/client';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AvatarConfigurator from '../../../../components/AvatarConfigurator';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import * as UserEdit from '../../../../graphql/frontend/mutations/UserEditMutation';
import * as Me from '../../../../graphql/frontend/queries/MeQuery';

interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  school?: string;
  mobileNo?: string;
}

const Settings: React.FC = function () {
  const { data: meData } = useQuery<Me.Data>(Me.Query);

  const [userEdit, { data, error }] = useMutation<
    UserEdit.Data,
    UserEdit.Variables
  >(UserEdit.Mutation, { refetchQueries: [{ query: Me.Query }] });

  const [errorState, setErrorState] = useState<string>();
  const [submitType, setSubmitType] = useState<string>();
  const [userInfo, setUserInfo] = useState<User>({
    id: meData?.me?.id,
    firstName: meData?.me?.firstName,
    lastName: meData?.me?.lastName,
    email: meData?.me?.email,
    school: meData?.me?.school?.name,
    mobileNo: meData?.me?.mobileNo,
  });

  const submit = useCallback<React.MouseEventHandler>(async () => {
    try {
      const result = await userEdit({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            id: userInfo!.id!,
            firstName: userInfo!.firstName!,
            lastName: userInfo!.lastName!,
            email: userInfo!.email!,
            schoolName: userInfo!.school!,
            mobileNo: userInfo!.mobileNo!,
          },
        },
      });
      return result.data;
    } catch (e) {}
  }, [userEdit, userInfo]);

  const SetUserInfoWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value } as User);
  };

  return (
    <div className="pt-6 xl:basis-3/4 xl:pt-3">
      <p className="mb-2 font-semibold">Avatar</p>
      <AvatarConfigurator submitType={submitType} />
      <div className="flex">
        <Input
          id="firstName"
          label="First Name"
          value={userInfo.firstName}
          className="mt-3 w-1/2 pr-1"
          onChange={(e) => SetUserInfoWrapper(e)}
        ></Input>
        <Input
          id="lastName"
          label="Last Name"
          value={userInfo.lastName}
          className="mt-3 w-1/2 pl-2"
          onChange={(e) => SetUserInfoWrapper(e)}
        ></Input>
      </div>
      <Input
        id="email"
        label="Email"
        className="mt-5"
        color={
          errorState?.split(',')[1].trim() == 'email' ? 'error' : 'default'
        }
        message={<p>{errorState?.split(',')[0].trim()}</p>}
        value={userInfo.email}
        onChange={(e) => SetUserInfoWrapper(e)}
      ></Input>
      <Input
        id="school"
        label="Name of School/Company"
        className="mt-5"
        value={userInfo.school}
        onChange={(e) => SetUserInfoWrapper(e)}
      ></Input>
      <Input
        id="mobileNo"
        label="Mobile Number"
        className="mt-5"
        value={userInfo.mobileNo}
        onChange={(e) => SetUserInfoWrapper(e)}
      ></Input>
      {error && (
        <p className="pt-3 text-error">Please ensure the fields are correct</p>
      )}
      {data && <p className="pt-3 text-success">Successfully Edited</p>}
      <div className="mb-3">
        <Button
          className="mt-8"
          size="sm"
          label="Save"
          onClick={(e) => {
            submit(e);
            setSubmitType('submit');
          }}
        ></Button>
        <Button
          className="mt-8 ml-3"
          size="sm"
          label="Cancel"
          variant="secondary"
        ></Button>
      </div>
    </div>
  );
};

export default Settings;
