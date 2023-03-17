import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Button from '../components/Button';
import Input from '../components/Input';
import CustomLink from '../components/Link';
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

      await router.push('/discover-courses');
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
          className="flex flex-col xsm:w-4/5 md:w-3/4 md:px-0 xl:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="mb-3">Create an account</h3>
          <p className="body1 mb-4">
            Registered?{' '}
            <CustomLink text="Login here." href="/login" variant="underlined">
              Login here
            </CustomLink>
          </p>
          <div className="grid gap-5">
            <div className="grid w-full grid-cols-2 gap-5 py-2">
              <Input
                type="text"
                placeholder="John"
                label="First Name"
                showMessage={errors.firstName ? true : false}
                message={
                  errors.firstName ? (
                    <span className="text-red-400">
                      {errors.firstName.message}
                    </span>
                  ) : (
                    <></>
                  )
                }
                {...register('firstName', { required: true })}
              ></Input>
              <Input
                type="text"
                placeholder="Doe"
                label="Last Name"
                showMessage={errors.lastName ? true : false}
                message={
                  errors.lastName ? (
                    <span className="text-red-400">
                      {errors.lastName.message}
                    </span>
                  ) : (
                    <></>
                  )
                }
                {...register('lastName', { required: true })}
              ></Input>
            </div>

            <Input
              type="email"
              placeholder="johndoe@email.com"
              label="Email"
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

            <Input
              type="text"
              label="Name of School/Company"
              showMessage={errors.school ? true : false}
              message={
                errors.school ? (
                  <span className="text-red-400">{errors.school.message}</span>
                ) : (
                  <></>
                )
              }
              {...register('school', { required: true })}
            ></Input>

            <Input
              type="number"
              placeholder="91234567"
              label="Mobile Number"
              autoComplete="tel-local"
              showMessage={errors.mobileNo ? true : false}
              message={
                errors.mobileNo ? (
                  <span className="text-red-400">
                    {errors.mobileNo.message}
                  </span>
                ) : (
                  <></>
                )
              }
              prefixElement={
                <span className="mb-5 h-full w-12 py-0 pr-2 leading-tight focus:outline-none">
                  +65
                </span>
              }
              {...register('mobileNo', { required: true })}
            ></Input>

            <Button
              className="mt-1"
              href="/signup"
              type="submit"
              label="Sign up"
            ></Button>
          </div>
        </form>
      </div>
    </PlainLayout>
  );
};

export default SignupPage;
