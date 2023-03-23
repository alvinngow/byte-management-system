import AvatarConfigurator from '../../../../components/AvatarConfigurator';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

const Settings: React.FC = function () {
  return (
    <div className="w-3/4 pt-3">
      <p className="mb-2 font-semibold">Avatar</p>
      <AvatarConfigurator />
      <div className="flex">
        <Input label="First Name" className="mt-3 w-1/2 pr-1"></Input>
        <Input label="Last Name" className="mt-3 w-1/2 pl-2"></Input>
      </div>
      <Input label="Email" className="mt-5"></Input>
      <Input label="Name of School/Company" className="mt-5"></Input>
      <Input label="Mobile Number" className="mt-5"></Input>
      <div className="mb-3">
        <Button className="mt-8" size="sm" label="Save"></Button>
        <Button
          className="mt-8 ml-3"
          size="sm"
          label="Cancel"
          variant="secondary"
        ></Button>
      </div>
    </div>
  );
};

export default Settings;
