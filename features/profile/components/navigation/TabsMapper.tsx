import React from 'react';
import { TabsType } from '../../types/TabsType';
import PostsCard from '../cards/PostsCard';
import FavouritesCard from '../cards/FavouritesCard';
import SettingsCard from '../cards/SettingsCard';

const TabsMapper = ({
   type,
   username,
}: {
   type: TabsType;
   username: string;
}) => {
   switch (type) {
      case 'posts': {
         return <PostsCard />;
      }
      case 'saved-posts': {
         return <FavouritesCard />;
      }
      case 'settings': {
         return <SettingsCard username={username} />;
      }
      default:
         return <PostsCard />;
   }
};

export default TabsMapper;
