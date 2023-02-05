import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/Button';
import Input from '../components/Input';
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
          className="flex w-3/4 flex-col "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Image width="35" height="35" src="/byte-no-bg.svg" alt="" />
          <p style={{ fontSize: '20px' }}>Sign in</p>
          <p>
            New user?{' '}
            <Link className="text text-blue-400" href="/signup">
              Create an account
            </Link>
          </p>
          <Input
            type="email"
            className="mt-4"
            placeholder="Email"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
          <Input
            type="password"
            className="my-4"
            placeholder="Password"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </PlainLayout>
  );
};

export default LoginPage;
