import { useParams } from 'react-router-dom';
export default function Deposit() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex items-center flex-col xl:w-1/3 2xl:w-1/3 3xl:w-1/4 lg:w-1/2 md:w-5/6 xs:w-full xs:p-2 m-auto">
      deposit
    </div>
  );
}
