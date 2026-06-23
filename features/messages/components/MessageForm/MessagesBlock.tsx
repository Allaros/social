import React from 'react';

const MessagesBlock = ({ isLeft }: { isLeft: boolean }) => {
   const blockText = isLeft ? 'Вы покинули чат' : 'Собеседник покинул чат';
   return (
      <div className="bg-neutralWhite-500 h-16 flex items-center justify-center">
         <p className="textLabel ">{blockText}</p>
      </div>
   );
};

export default MessagesBlock;
