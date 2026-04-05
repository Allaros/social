import React from 'react';
import { TabsType } from '../../types/TabsType';
import PostsCard from '../cards/PostsCard';
import FavouritesCard from '../cards/FavouritesCard';
import SettingsCard from '../cards/SettingsCard';

const TabsMapper = ({
   type,
   username,
   profileId,
}: {
   type: TabsType;
   username: string;
   profileId?: number;
}) => {
   switch (type) {
      case 'posts': {
         return <PostsCard id={profileId} username={username} />;
      }
      case 'saved-posts': {
         return <FavouritesCard />;
      }
      case 'settings': {
         return <SettingsCard username={username} />;
      }
      default:
         return <PostsCard id={profileId} username={username} />;
   }
};

export default TabsMapper;
