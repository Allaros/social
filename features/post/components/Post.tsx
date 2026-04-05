import AuthorBlock from './AuthorBlock';
import DOMPurify from 'dompurify';
import MediaView from './MediaView';
import { PostResponse } from '../types/post.responce';
import ActionBlock from './ActionBlock';

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

   const safeHtml = DOMPurify.sanitize(post.content);
   return (
      <div className="card  py-6">
         <AuthorBlock permissions={permissions} post={post} />
         <div className="pt-6 px-8">
            <div
               className="textBody mb-6"
               dangerouslySetInnerHTML={{ __html: safeHtml }}
            ></div>
            {post.media.length !== 0 && <MediaView media={post.media} />}
         </div>
         <ActionBlock post={post} />
      </div>
   );
};

export default Post;
