import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/Button';
import ByteLogoIcon from '../components/icons/ByteLogoIcon';
import Input from '../components/Input';
import CustomLink from '../components/Link';
import * as LoginMutation from '../graphql/frontend/mutations/LoginMutation';
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

  const [login] = useMutation<LoginMutation.Data, LoginMutation.Variables>(
    LoginMutation.Mutation
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await login({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            email: data.email,
            password: data.password,
          },
        },
      });

      await router.push('/home');
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
