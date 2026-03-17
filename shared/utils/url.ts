import qs from 'query-string';

interface UrlQueryParams {
   params: string;
   key: string;
   value: string;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
   const currentUrl = qs.parse(params);

   currentUrl[key] = value;

   return qs.stringifyUrl({
      url: window.location.pathname,
      query: currentUrl,
   });
};

export const removeKeysFromQuery = ({
   params,
   keysToRemove,
   pathname,
}: {
   params: string;
   keysToRemove: string[];
   pathname: string;
}) => {
   const queryString = qs.parse(params);

   keysToRemove.forEach((key) => {
      delete queryString[key];
   });

   return qs.stringifyUrl(
      {
         url: pathname,
         query: queryString,
      },
      {
         skipNull: true,
      }
   );
};
