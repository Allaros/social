'use client';

import { useGetProfile } from '../hooks/useGetProfile';
import { TabsType } from '../types/TabsType';
import PostsCard from './cards/PostsCard';
import ProfileCard from './cards/ProfileCard';
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
            <TabsMapper
               type={tab}
               username={username}
               profileId={profile?.id}
            />
         ) : (
            <PostsCard isOwner={false} username={username} id={profile?.id} />
         )}
      </>
   );
};

export default ProfileView;
