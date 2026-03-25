'use client';

import { useGetProfile } from '../hooks/useGetProfile';
import { TabsType } from '../types/TabsType';
import PostsCard from './cards/PostsCard';
import ProfileCard from './cards/ProfileCard';
import SettingsCard from './cards/SettingsCard';
import TabsMapper from './navigation/TabsMapper';

const ProfileView = ({
   username,
   tab,
}: {
   username: string;
   tab: TabsType;
}) => {
   const { data: profile, isError } = useGetProfile(username);

   return (
      <>
         <ProfileCard profile={profile} isError={isError} />
         {profile && profile.isOwner ? (
            <TabsMapper type={tab} username={username} />
         ) : (
            <PostsCard />
         )}
      </>
   );
};

export default ProfileView;
