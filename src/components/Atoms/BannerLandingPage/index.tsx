import React from 'react';

interface BannerLandingPageProps {
    title: string;
}

const BannerLandingPage: React.FC<BannerLandingPageProps> = ({ title }) => {
    return (
        <div className="bg-[conic-gradient(from_45deg_at_75%_78.10000000000001%,rgba(78,92,107,0.15)_30.56300675675674deg,var(--token-5e850461-2bc8-4236-b2e7-96fb01c7ae79,rgb(250,250,250))_303.96511824324324deg)] min-h-[204px] ">
            <h1  style={{
        background: `linear-gradient(73deg, var(--token-37e7984d-7291-4e22-8591-4bd45b7f5648, rgb(0, 42, 92)) -15%, var(--token-1a3314b7-d856-4bbf-9555-cca65d3da8d1, rgb(0, 112, 231)) 46%, rgb(113, 203, 230) 73%)`,
        backgroundClip: "text",
      }} className="lg:text-[56px] md:text-[48px] text-[40px] font-bold text-blue-600 text-center h-[204px] flex justify-center items-center text-transparent">{title}</h1>
        </div>
    );
};

export default BannerLandingPage;

