import React from 'react';
import { CommentResponse } from '../types/comments.interface';

type CommentContextType = {
   postId: number;
   postAuthorUsername: string;
   currentProfile?: ProfileResponce | null;
   scrollRef: React.RefObject<HTMLDivElement | null>;
};

export const CommentContext = React.createContext<CommentContextType | null>(
   null
);

export const useCommentContext = () => {
   const ctx = React.useContext(CommentContext);
   if (!ctx) throw new Error('No CommentContext');
   return ctx;
};
