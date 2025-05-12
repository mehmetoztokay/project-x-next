import React from "react";

interface BannerLandingPageWhoWeAreProps {
  title: string;
  description: string;
}

const BannerLandingPageWhoWeAre: React.FC<BannerLandingPageWhoWeAreProps> = ({ title, description }: {title: string, description: string}) => {
  return (
    <div className="min-h-[204px] pt-14 pb-28 bg-[conic-gradient(from_40deg_at_80.4%_88.2%,rgb(202,214,227)_54.7231deg,rgb(255,255,255)_360deg)]">
      <h1
        style={{
          background: `linear-gradient(73deg, var(--token-37e7984d-7291-4e22-8591-4bd45b7f5648, rgb(0, 42, 92)) -15%, var(--token-1a3314b7-d856-4bbf-9555-cca65d3da8d1, rgb(0, 112, 231)) 46%, rgb(113, 203, 230) 73%)`,
          backgroundClip: "text",
        }}
        className="flex items-center justify-center text-center text-[40px] font-bold text-blue-600 text-transparent md:text-[48px] lg:text-[56px] "
      >
        {title}
      </h1>
      <p className="text-center text-[#68798c] lg:text-2xl text-xl">{description}</p>
    </div>
  );
};

export default BannerLandingPageWhoWeAre;
