import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [,vote] = useVoteMutation();
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      mr={4}
    >
      <IconButton 
        onClick={() => {
          if (post.voteStatus === 1) {
            return;
          }
          vote({
            postId: post.id,
            value: 1
          });
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        aria-label="updoot post"
        icon="chevron-up" 
      />
      {post.points}
      <IconButton 
        onClick={() => {
          if (post.voteStatus === -1) {
            return;
          }
          vote({
            postId: post.id,
            value: -1
          });
        }}
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        aria-label="downdoot post"
        icon="chevron-down"
        />
    </Flex>
  );
};