/* eslint-disable jsx-a11y/alt-text */
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { UserRole } from '../../gen/graphql/resolvers';
import ErrorImage from '../components/404Error';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import useCurrentUser from '../hooks/useCurrentUser';
import AppLayout from '../layouts/AppLayout';

const ErrorPage: NextPage = function (props) {
  const router = useRouter();
  const { me, loading: meLoading } = useCurrentUser();

  if (meLoading) {
    return null;
  }

  return (
    <>
      {meLoading && <Spinner />}
      {me != null ? (
        <AppLayout>
          <div>
            <ErrorImage className="mx-auto"></ErrorImage>
            <Button className="mx-auto mt-7 flex" href="/discover-courses">
              BACK TO HOME PAGE
            </Button>
          </div>
        </AppLayout>
      ) : (
        <div>
          <ErrorImage className="mx-auto"></ErrorImage>
          <Button className="mx-auto mt-7 flex" href="/">
            BACK TO HOME PAGE
          </Button>
        </div>
      )}
    </>
  );
};

export default ErrorPage;
