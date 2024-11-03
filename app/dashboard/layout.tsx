import { auth, signIn } from "@/auth";
import Header from "@/components/Header";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if (!session?.user?.email) return signIn();

  const userName = session?.user?.name || session?.user?.email?.split("@")[0];
  const userAvatar = session?.user?.image;

  return (
    <div>
      <Header userName={userName} userAvatar={userAvatar} />
      {children}
    </div>
  );
};

export default layout;
