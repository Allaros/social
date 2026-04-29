import React from 'react';
import { TabsType } from '../../types/TabsType';
import PostsCard from '../cards/PostsCard';
import FavouritesCard from '../cards/FavouritesCard';
import SettingsCard from '../cards/SettingsCard';
import { useProfile } from '../../hooks/useProfile';

const TabsMapper = ({
   type,
   username,
   profileId,
}: {
   type: TabsType;
   username: string;
   profileId?: number;
}) => {
   const profile = useProfile();

   const isOwner = profile?.username === username;

   switch (type) {
      case 'posts': {
         return (
            <PostsCard id={profileId} username={username} isOwner={isOwner} />
         );
      }
      case 'saved-posts': {
         return <FavouritesCard />;
      }
      case 'settings': {
         return <SettingsCard username={username} />;
      }
      default:
         return (
            <PostsCard id={profileId} username={username} isOwner={isOwner} />
         );
   }
};

export default TabsMapper;
