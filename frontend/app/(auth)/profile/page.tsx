import { auth } from '@/auth';
import { SignoutButton } from '@/features/auth/components/signoutButton';
import Image from 'next/image';
import { Session } from 'next-auth';

const Profile = async () => {
  const session: Session | null = await auth();

  // Check if session or user is missing
  if (!session || !session.user) {
    return <div>Please sign in to continue.</div>;
  }

  //extract user info 
  const { name, email, image } = session.user;

  return (
    <div className="flex flex-col gap-4 p-4">
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      {image && (
        <Image
          src={image}
          alt="User image"
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
      )}
      <SignoutButton />
    </div>
  );
};

export default Profile;
