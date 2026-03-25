import ProfileView from '@/features/profile/components/ProfileView';
import { TabsType } from '@/features/profile/types/TabsType';

const ProfilePage = async ({
   params,
   searchParams,
}: {
   params: { username: string };
   searchParams: { tab: TabsType };
}) => {
   const username = (await params).username;
   const tab = (await searchParams).tab;

   return (
      <div className="">
         <ProfileView username={username} tab={tab} />
      </div>
   );
};

export default ProfilePage;
