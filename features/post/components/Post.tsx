import { PostResponce } from '../types/post.responce';
import AuthorBlock from './AuthorBlock';
import DOMPurify from 'dompurify';
import MediaView from './MediaView';

const Post = ({
   post,
   userProfileId,
}: {
   post: PostResponce;
   userProfileId?: number;
}) => {
   const permissions = {
      canDelete: userProfileId === post.author.id,
      canEdit: userProfileId === post.author.id,
      canReport: userProfileId !== post.author.id,
   };

   const safeHtml = DOMPurify.sanitize(post.content);
   return (
      <div className="card  py-6">
         <AuthorBlock
            permissions={permissions}
            author={post.author}
            createdAt={post.createdAt}
            postId={post.id}
         />
         <div className="pt-6 px-8">
            <div
               className="textBody mb-6"
               dangerouslySetInnerHTML={{ __html: safeHtml }}
            ></div>
            {post.media.length !== 0 && <MediaView media={post.media} />}
         </div>
      </div>
   );
};

export default Post;
