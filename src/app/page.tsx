import { Suspense } from "react";
import Banner from "@/components/Banner";
import LibrarySection, { LibrarySkeleton } from "@/components/LibrarySection";

const BannerLibraryPage = () => {
  return (
    <div>
      <Banner />

      <Suspense fallback={<LibrarySkeleton />}>
        <LibrarySection />
      </Suspense>
    </div>
  );
};

export default BannerLibraryPage;
















// import Banner from '@/components/Banner';
// import React from 'react';

// const Page = () => {
//   return (
//     <div>
//         <Banner/>

//     </div>
//   );
// };

// export default Page;