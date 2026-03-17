import { createContext } from 'react';

type LoaderContextType = {
   showLoader: () => void;
   hideLoader: () => void;
};

export const LoaderContext = createContext<LoaderContextType | null>(null);
