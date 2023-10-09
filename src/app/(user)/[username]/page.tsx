type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Props) {
  const { username } = params;
  return <main className="">User: {username}</main>;
}
