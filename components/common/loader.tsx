import React from 'react';

const Loader = ({ isPending }: { isPending: boolean }) => {
   return (
      <div
         className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition bg-[#ffffff77] ${isPending ? 'z-100 opacity-100' : '-z-1 opacity-0'}`}
      >
         <div className="customLoader"></div>
      </div>
   );
};

export default Loader;
