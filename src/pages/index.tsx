import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { usePostsQuery, useDeletePostMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, IconButton, Link, Stack, Text } from "@chakra-ui/react";
import { UpdootSection } from "../components/UpdootSection";
import { createBrotliDecompress } from "zlib";


const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const = [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [,deletePost] = useDeletePostMutation();

  if (!data && !fetching) {
    return <div>query failed</div>;
  };

  return (
    <Layout>
      {!data && fetching ? (
        <div>...loading</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => 
          !p ? null : (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <UpdootSection post={p} />
              <Box flex={1}>
                <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading> 
                  </Link>
                </NextLink>
                <Text>posted by {p.creator.username}</Text>
                <Flex align="center">
                  <Text flex={1} mt={4}>{p.textSnippet}</Text>
                  {meData?.me?.id !== p.creator.id ? null : (
                    <Box ml="auto">
                      <NextLink href='/post/edit/[id]' as={`/post/edit/${p.id}`}>
                        <IconButton
                          as={Link}
                          mr={4}
                          icon="edit"
                          aria-label="Edit Post"
                        />
                      </NextLink>
                      <IconButton
                        icon="delete"
                        aria-label="Delete Post"
                        onClick={() => {
                          deletePost({ id: p.id });
                        }}
                      />
                    </Box>
                  )}
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
      <Flex>
        <Button
          onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            });
          }}
          isLoading={fetching}
          m="auto"
          my={8}
        >
          load more
        </Button>
      </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
