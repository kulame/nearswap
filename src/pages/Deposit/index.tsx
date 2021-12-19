import { Card } from 'components/Card';

export default function Deposit() {
  return (
    <div className="flex items-center flex-col xl:w-1/3 2xl:w-1/3 3xl:w-1/4 lg:w-1/2 md:w-5/6 xs:w-full xs:p-2 m-auto">
      <Card width="w-full" bgcolor="bg-dark">
        <h2 className="formTitle font-bold text-xl text-white text-left pb-4">
          存款
        </h2>
      </Card>
    </div>
  );
}
