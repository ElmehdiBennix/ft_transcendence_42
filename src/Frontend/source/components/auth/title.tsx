/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

function Title() {
  return (
    <div className="flex h-auto w-3/4 flex-col justify-center lg:w-5/6">
      <div className="mb-[-6px] flex size-full h-[35px] gap-4 pl-2 md:mb-[-10px] md:h-[40px]">
        <img src="/google.svg" alt="google" className="h-full" />
        <img src="/42.svg" alt="google" className=" h-full py-[0.35rem]" />
      </div>
      <div className="font-dayson h-4/6 text-[30px] dark:text-white">
        <h1 className="h-[45px] text-[2.7rem] md:h-[80px] md:text-[4.2rem]">Authenticate</h1>
        <h1 className="flex items-start justify-start gap-2">
          your
          <span className="dark:text-primary-dark text-primary">account</span>
        </h1>
      </div>
    </div>
  );
}

export default Title;

// {
//   /* <svg
//   xmlns="http://www.w3.org/2000/svg"
//   x="0px"
//   y="0px"
//   width="40"
//   height="40"
//   viewBox="0 0 48 48"
// >
//   <path d="M23 21.5v5c0 .828.671 1.5 1.5 1.5h10.809c-.499 1.416-1.256 2.698-2.205 3.805l6.033 5.229C42.159 33.529 44 28.98 44 24c0-.828-.064-1.688-.202-2.702C43.697 20.555 43.062 20 42.312 20H24.5C23.671 20 23 20.672 23 21.5zM12.612 27.761C12.22 26.577 12 25.314 12 24s.22-2.577.612-3.761l-6.557-5.014C4.752 17.878 4 20.849 4 24s.752 6.122 2.056 8.775L12.612 27.761zM30.865 33.835C28.906 35.204 26.532 36 24 36c-4.212 0-7.917-2.186-10.059-5.478l-6.362 4.865C11.195 40.585 17.202 44 24 44c4.968 0 9.508-1.832 13.009-4.84L30.865 33.835zM37.515 9.297C33.813 5.881 29.013 4 24 4c-6.798 0-12.805 3.415-16.421 8.614l6.362 4.865C16.083 14.186 19.788 12 24 12c2.944 0 5.776 1.081 7.974 3.043.593.53 1.498.504 2.06-.059l3.525-3.524c.289-.288.447-.683.439-1.091C37.99 9.961 37.815 9.574 37.515 9.297z"></path>
// </svg> */
// }
