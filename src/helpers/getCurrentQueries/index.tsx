import { useSearchParams } from "next/navigation";

export const getCurrentQueries = () => {
  const searchParams = useSearchParams();

  return Object.fromEntries(searchParams.entries());
};
