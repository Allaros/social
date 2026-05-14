import React from 'react';
import {
   NotificationActorType,
   NotificationType,
} from '../types/notifications.interface';
import { NotificationPresets } from '../constants/notifications-presets';
import { buildNames } from '../utils/build-names';

type AggregationType = 'count' | 'actors';

type NotificationTextProps = {
   actors: NotificationActorType[];
   type: NotificationType;
   aggregatedCount?: number;
   aggregationType?: AggregationType;
   textPreview?: string;
};

const MAX_NAMES = 3;

const NotificationText = ({
   actors,
   type,
   aggregatedCount,
   aggregationType: aggregationTypeProp,
   textPreview,
}: NotificationTextProps) => {
   const preset = NotificationPresets[type];

   const total = aggregatedCount ?? actors.length;

   const aggregationType =
      aggregationTypeProp ?? (total > 1 ? 'count' : 'actors');

   if (aggregationType === 'count') {
      const mainActor = actors[0];

      return (
         <p>
            <span className="text-neutralBlack-900 textBody-medium">
               {mainActor.name}
            </span>{' '}
            {total > 1 && <>и ещё {total - 1} </>}
            <span className="text-nowrap">
               {total > 1 ? preset.aggregated : preset.single}
            </span>{' '}
            {textPreview && <span>"{textPreview}"</span>}
         </p>
      );
   }

   const visibleActors = actors.slice(0, MAX_NAMES);
   const rest = total - visibleActors.length;

   const names = buildNames(visibleActors);

   return (
      <p>
         <span className="text-neutralBlack-900 textBody-medium">{names}</span>{' '}
         {rest > 0 && <>и ещё {rest} </>}
         <span className="text-nowrap">
            {total > 1 ? preset.aggregated : preset.single}
         </span>{' '}
         {textPreview && <span className="italic">"{textPreview}..."</span>}
      </p>
   );
};

export default NotificationText;
