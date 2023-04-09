import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { CurrentUser, UserRole } from '../../gen/graphql/operations';
import Button from '../components/Button';
import ByteLogoIcon from '../components/icons/ByteLogoIcon';
import Input from '../components/Input';
import CustomLink from '../components/Link';
import Modal from '../components/Modal';
import * as LoginMutation from '../graphql/frontend/mutations/LoginMutation';
import useLoginEmailVerification from '../hooks/useLoginEmailVerification';
import PlainLayout from '../layouts/PlainLayout';

interface Inputs {
  email: string;
  password: string;
}

const LoginPage: NextPage = function (props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const router = useRouter();

  const { isVerifiedModalOpen, closeVerifiedModal } =
    useLoginEmailVerification();

  const [login] = useMutation<
    LoginMutation.Data & { accountLogin: CurrentUser },
    LoginMutation.Variables
  >(LoginMutation.Mutation);

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    try {
      await login({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            email: input.email,
            password: input.password,
          },
        },
      }).then((response) => {
        if (response.data?.accountLogin.role === UserRole.User) {
          router.push('/discover-courses');
        } else {
          router.push('/manage/users');
        }
      });
    } catch (e) {
      setError('password', {
        type: 'server',
        message: 'Invalid credentials',
      });
    }
  };

  return (
    <PlainLayout>
      <div className="flex h-screen flex-col items-center justify-center">
        {isVerifiedModalOpen && (
          <Modal
            onClose={closeVerifiedModal}
            modalTitle="Account has been verified!"
          >
            <div className="p-4 text-center">
              <p className="text-secondary-text">
                In order to volunteer in our courses, please wait for our
                Administrator to
              </p>
              <p className="text-secondary-text">
                approve your onboarding process in order to start volunteering
                with us!
              </p>
              <p className="text-secondary-text">
                It will take about 1-3 business days.
              </p>
              <p className="text-secondary-text">
                You&apos;ll receive an email once the approval has been made.
              </p>
              <Button onClick={closeVerifiedModal} className="mt-4">
                OK!
              </Button>
            </div>
          </Modal>
        )}
        <form
          className="flex flex-col xsm:w-full xsm:w-4/5 md:w-3/4 md:px-0 xl:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ByteLogoIcon className="mb-9" />
          <h3 className="mb-4">Sign in</h3>
          <p className="body1 text-secondary">
            New user?{' '}
            <CustomLink
              text="Create an account"
              href="/signup"
              variant="underlined"
            >
              Login here.
            </CustomLink>
          </p>
          <div className="my-6 grid gap-5">
            <Input
              type="email"
              label="Email"
              color={errors.email ? 'error' : 'default'}
              showMessage={errors.email ? true : false}
              message={
                errors.email ? (
                  <span className="text-red-400">{errors.email.message}</span>
                ) : (
                  <></>
                )
              }
              {...register('email', { required: true })}
            ></Input>

            <Input
              type="password"
              label="Password"
              color={errors.password ? 'error' : 'default'}
              showMessage={errors.password ? true : false}
              message={
                errors.password ? (
                  <span className="text-red-400">
                    {errors.password.message}
                  </span>
                ) : (
                  <></>
                )
              }
              {...register('password', { required: true })}
            ></Input>
            <Button className="mt-1" type="submit" label="Log in"></Button>
          </div>
        </form>
      </div>
    </PlainLayout>
  );
};

export default LoginPage;
