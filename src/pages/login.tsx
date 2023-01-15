import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

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
  } = useForm<Inputs>();

  const router = useRouter();

  const [login] = useMutation<LoginMutation.Data, LoginMutation.Variables>(
    LoginMutation.Mutation,
    {
      onCompleted() {
        router.push('/home');
      },
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <PlainLayout>
      <div className="flex flex-col justify-center items-center h-screen">
        <form
          className="flex flex-col w-3/4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            style={{ width: '150px', height: '150px' }}
            src="https://via.placeholder.com/150"
            alt=""
          />
          <p style={{ fontSize: '20px' }}>Sign in</p>
          <p>
            New user?{' '}
            <Link className="text text-blue-400" href="/signup">
              Create an account
            </Link>
          </p>
          <input
            type="email"
            className="mt-4"
            placeholder="Email"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', { required: true })}
          />
          <input
            type="password"
            className="my-4"
            placeholder="Password"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', { required: true })}
          />
          <button
            type="submit"
            className="rounded-3xl shadow-lg text-white bg-blue-400 p-2"
          >
            Login
          </button>
        </form>
      </div>
    </PlainLayout>
  );
};

export default LoginPage;
