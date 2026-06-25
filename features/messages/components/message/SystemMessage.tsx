import React from 'react';

const SystemMessage = ({ text }: { text: string }) => {
   return (
      <div className="py-0.5 my-1 px-2 w-full max-w-[60%] self-center rounded-[100px] bg-neutralWhite-500 text-center">
         <p className="textLabel">{text}</p>
      </div>
   );
};

export default SystemMessage;
