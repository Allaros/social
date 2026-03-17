'use client';
import React, { useEffect, useRef, useState } from 'react';
import { LoaderContext } from '../context/LoaderContext';
import { createPortal } from 'react-dom';
import Loader from '../components/Loader';

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
   const [visible, setVisible] = useState(false);
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   const requestCounter = useRef(0);

   const timer = useRef<NodeJS.Timeout | null>(null);

   const showLoader = () => {
      requestCounter.current += 1;

      if (timer.current) return;

      timer.current = setTimeout(() => {
         setVisible(true);
      }, 200);
   };

   const hideLoader = () => {
      requestCounter.current -= 1;
      if (requestCounter.current > 0) return;

      requestCounter.current = 0;

      if (timer.current) {
         clearTimeout(timer.current);
         timer.current = null;
      }

      setVisible(false);
   };
   return (
      <LoaderContext.Provider value={{ showLoader, hideLoader }}>
         {children}

         {mounted && createPortal(<Loader visible={visible} />, document.body)}
      </LoaderContext.Provider>
   );
};

export default LoaderProvider;
