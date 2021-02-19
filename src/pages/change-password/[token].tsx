import React  from 'react';
import { NextPage } from 'next';
import { Formik, Form  } from 'formik'
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../../components/Wrapper';
import { InputField } from '../../components/InputField';
import { toErrorMap } from '../../utils/toErrorMap';
import login from "../login";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik 
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, {setErrors}) => {
          // const response = await login(values);
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors));
          // }
          // else if (!response.data?.login.errors) {
          //   // worked
          //   router.push("/");
            
          // }
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

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;