import Image from 'next/image';

interface Props extends React.PropsWithChildren {
  className: string;
}

const ErrorImage: React.FC<Props> = function (props: Props) {
  return (
    <Image
      className="mx-auto flex"
      src="/404-Error-Picture.jpg"
      alt="errorpicture"
      width={1000}
      height={1000}
    />
  );
};

export default ErrorImage;
