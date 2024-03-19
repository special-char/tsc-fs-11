import FormInput from '@/components/formFields/FormInput';
import FormSelect from '@/components/formFields/FormSelect';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const wait = time => new Promise(resolve => setTimeout(resolve, time));

const fields = [
  {
    id: 'firstName',
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Yagnesh',
    rules: {
      required: {
        value: true,
        message: 'Please enter first name',
      },
    },
    component: FormInput,
  },
  {
    id: 'lastName',
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Modh',
    rules: {
      required: {
        value: true,
        message: 'Please enter last name',
      },
    },
    component: FormInput,
  },
  {
    id: 'email',
    name: 'email',
    placeholder: 'yagnesh.modh@gmai.com',
    rules: {
      required: {
        value: true,
        message: 'Please enter email',
      },
    },
    component: FormInput,
  },
  {
    id: 'password',
    name: 'password',
    placeholder: 'strong password',
    rules: {
      required: {
        value: true,
        message: 'Please enter password',
      },
    },
    component: FormInput,
  },
  // {
  //   id: 'gender',
  //   label: 'Gender',
  //   name: 'gender',
  //   placeholder: 'Please Select Gender',
  //   options: [
  //     {
  //       value: 'male',
  //       text: 'Male',
  //     },
  //     {
  //       value: 'female',
  //       text: 'Female',
  //     },
  //   ],
  //   rules: {
  //     required: {
  //       value: true,
  //       message: 'Please enter gender',
  //     },
  //   },
  //   component: FormSelect,
  // },
];

function Register() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(async value => {
    await wait(5000);
    console.log(value);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map(({ component: Component, name, ...props }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => <Component field={field} {...props} />}
          />
        ))}
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}

export default Register;
