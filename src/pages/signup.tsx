import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    setError,
  } = useForm<Inputs>();

  const router = useRouter();

  const [signup] = useMutation<SignupMutation.Data, SignupMutation.Variables>(
    SignupMutation.Mutation
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signup({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            ...data,
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
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <form
          className="flex w-3/4 flex-col "
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="mb-3 text-xl">Create an account</p>
          <p className="mb-6">
            Registered?{' '}
            <Link className="text text-blue-400 underline" href="/login">
              Login here.
            </Link>
          </p>

          <div className="grid w-full grid-cols-2">
            <div className="pr-2">
              <label htmlFor="First Name">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="mt-3 mr-3 mb-5 w-full border-b border-gray-400 py-1 px-2 leading-tight focus:outline-none"
                aria-invalid={errors.firstName ? 'true' : 'false'}
                {...register('firstName', { required: true })}
              />
              {errors.firstName && (
                <span className="text-red-400">{errors.firstName.message}</span>
              )}
            </div>
            <div className="pl-2">
              <label htmlFor="Last Name">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="mt-3 mr-3 mb-5 w-full border-b border-gray-400 py-1 px-2 leading-tight focus:outline-none"
                aria-invalid={errors.lastName ? 'true' : 'false'}
                {...register('lastName', { required: true })}
              />
              {errors.lastName && (
                <span className="text-red-400">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <label htmlFor="Email" className="mb-3">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="width-full mr-3 mb-5 w-full border-b border-gray-400 py-1 px-2 leading-tight focus:outline-none"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}

          <label htmlFor="Password" className="mb-3">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="width-full mr-3 mb-5 w-full border-b border-gray-400 py-1 px-2 leading-tight focus:outline-none"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}

          <label htmlFor="School/ Work" className="mb-3">
            School/ Work
          </label>
          <input
            type="text"
            placeholder=""
            className="width-full mr-3 mb-5 w-full border-b border-gray-400 py-1 px-2 leading-tight focus:outline-none"
            aria-invalid={errors.school ? 'true' : 'false'}
            {...register('school', { required: true })}
          />
          {errors.school && (
            <span className="text-red-400">{errors.school.message}</span>
          )}

          <label htmlFor="Mobile Number" className="mb-3">
            Mobile Number
          </label>

          <div className="flex">
            <span className="mb-5 w-12 border-b border-gray-400 py-1 px-2 leading-tight focus:outline-none">
              +65
            </span>
            <input
              type="text"
              className="width-full mr-3 mb-5 w-full appearance-none border-b border-gray-400 py-1 px-2 leading-tight focus:outline-none"
              aria-invalid={errors.mobileNo ? 'true' : 'false'}
              {...register('mobileNo', { required: true })}
              placeholder="9123 4567"
            />
            {errors.mobileNo && (
              <span className="text-red-400">{errors.mobileNo.message}</span>
            )}
          </div>

          <label htmlFor="Avatar">Avatar</label>
          <p className="mb-5"></p>
          {/* <input type="file" /> */}
          <p className="text mb-10 text-blue-400 underline">
            Add Profile Picture
          </p>

          <a
            href="login"
            type="submit"
            className="rounded-3xl bg-blue-400 p-2 text-center text-white shadow-lg"
          >
            {' '}
            Sign Up
          </a>
        </form>
      </div>
    </PlainLayout>
  );
};

export default SignupPage;
