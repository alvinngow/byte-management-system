import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import * as SignupMutation from '../graphql/frontend/mutations/SignupMutation';
import PlainLayout from '../layouts/PlainLayout';

interface Inputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  school: string;
}

const SignupPage: NextPage = function (props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [signup] = useMutation<SignupMutation.Data, SignupMutation.Variables>(
    SignupMutation.Mutation
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signup({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          ...data,
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
        <input
          type="text"
          placeholder="First Name"
          aria-invalid={errors.firstName ? 'true' : 'false'}
          {...register('firstName', { required: true })}
        />
        <input
          type="text"
          placeholder="Last Name"
          aria-invalid={errors.lastName ? 'true' : 'false'}
          {...register('lastName', { required: true })}
        />
        <input
          type="text"
          placeholder="Mobile No"
          aria-invalid={errors.mobileNo ? 'true' : 'false'}
          {...register('mobileNo', { required: true })}
        />
        <input
          type="text"
          placeholder="School"
          aria-invalid={errors.school ? 'true' : 'false'}
          {...register('school', { required: true })}
        />
        <input type="submit" value="Submit" />
      </form>
    </PlainLayout>
  );
};

export default SignupPage;
