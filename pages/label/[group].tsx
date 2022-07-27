import { useRouter } from 'next/router';

const Group = () => {
  const router = useRouter();
  const { group } = router.query;
  return (
    <div>
      <h1>{group}</h1>
    </div>
  );
};

export default Group;
