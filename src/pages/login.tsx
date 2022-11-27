import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import * as Login from '../graphql/frontend/mutations/Login';
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

  const [login] = useMutation<Login.Data, Login.Variables>(Login.Mutation, {
    onCompleted() {
      router.push('/home');
    },
  });

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register('password', { required: true })}
        />
        <input type="submit" value="Submit" />
      </form>
    </PlainLayout>
  );
};

export default LoginPage;
