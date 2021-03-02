import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery, useCreatePostMutation } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
}