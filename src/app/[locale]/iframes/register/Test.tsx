import { useEffect } from "react";

export const TestPage = () => {
  useEffect(() => {
    // TODO Does not work
    // const marketingId = await getMarketingId()

    console.log("selam");
  }, []);

  return <div>TestPages</div>;
};
