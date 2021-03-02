import React, { useState }  from 'react';
import { NextPage } from 'next';
import { Formik, Form  } from 'formik'
import { Box, Button, Link, Flex } from '@chakra-ui/react';
import { Wrapper } from '../../components/Wrapper';
import { InputField } from '../../components/InputField';
import { toErrorMap } from '../../utils/toErrorMap';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from 'next/link';

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [,changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper variant="small">
      <Formik 
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, {setErrors}) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: typeof router.query.token === 'string' ? router.query.token : '',
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          }
          else if (!response.data?.changePassword.errors) {
            // worked
            router.push("/");
            
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form> 
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"      
            />
            <Flex>
              {tokenError ? <Box mr={2} color="red">{tokenError}</Box> : null}
              <NextLink href="/forgot-password">
                <Link>reset password</Link>
              </NextLink>
            </Flex>
            <Button 
              mt={4} 
              type="submit" 
              isLoading={isSubmitting} 
              color="red"
            >
              change password
            </Button>
          </Form>
        )} 
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);