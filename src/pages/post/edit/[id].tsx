
import React from 'react'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { useRouter } from 'next/router';

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId()
  const [{ data, fetching }] = usePostQuery({
    variables: {
      pause: intId === -1,
      id: intId
    }
  });
  const [,updatePost] = useUpdatePostMutation();

  if (fetching) {
    return(
      <Layout>loading...</Layout>
    );
  }

  if (!data?.post) {
    return(
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik 
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          // const {error} = await createPost({input: values});
          // if (!error) {
          //   router.push("/");
          // }
          await updatePost({ id: intId, ...values });
          router.push('/')
        }}
      >
        {({ isSubmitting }) => (
          <Form> 
            <InputField
              name="title"
              placeholder="title"
              label="Title"      
            />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"    
              />
            </Box>
            <Button 
              mt={4} 
              type="submit" 
              isLoading={isSubmitting} 
              color="red"
            >
              update post
            </Button>
          </Form>
        )} 
      </Formik>    
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(EditPost);