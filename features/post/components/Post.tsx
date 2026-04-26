import AuthorBlock from './post-header/AuthorBlock';
import DOMPurify from 'dompurify';
import MediaView from './post-main/MediaView';
import { PostResponse } from '../types/post.responce';
import ActionBlock from './post-footer/ActionBlock';
import ViewTracker from './ViewTracker';
import { useRef } from 'react';

const Post = ({
   post,
   editable,
}: {
   post: PostResponse;
   editable?: boolean;
}) => {
   const permissions = {
      canDelete: post.isOwned,
      canEdit: editable ?? false,
      canReport: !post.isOwned,
   };

   const viewedRef = useRef(false);

   const safeHtml = DOMPurify.sanitize(post.content);
   return (
      <div className="card pt-6 max-md:pt-3">
         <AuthorBlock permissions={permissions} post={post} />
         <ViewTracker postId={post.id} viewedRef={viewedRef} />
         <div className="pt-6 px-8 max-md:px-4 max-md:pt-3">
            <div
               className="textBody mb-6 max-md:mb-3"
               dangerouslySetInnerHTML={{ __html: safeHtml }}
            ></div>
            {post.media.length !== 0 && <MediaView media={post.media} />}
         </div>
         <ActionBlock post={post} />
         <ViewTracker postId={post.id} viewedRef={viewedRef} />
      </div>
   );
};

export default Post;
