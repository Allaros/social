const Loader = ({ visible }: { visible: boolean }) => {
   return (
      <div
         className={`fixed inset-0 w-full h-full flex items-center justify-center transition bg-[#ffffff77] ${visible ? 'z-100 opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
         <div className="customLoader"></div>
      </div>
   );
};

export default Loader;
