import FormInput from '@/components/formFields/FormInput';
import FormRadioGroup from '@/components/formFields/FormRadioGroup';
import FormSelect from '@/components/formFields/FormSelect';
import FormCheckboxInput from '@/components/formFields/FormCheckboxInput';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FormComboBox from '@/components/formFields/FormComboBox';
import FormDatePicker from '@/components/formFields/FormDatePicker';

const wait = time => new Promise(resolve => setTimeout(resolve, time));

// switch
// slider
// otp
// textarea

const fields = [
  {
    id: 'firstName',
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Yagnesh',
    component: FormInput,
  },
  {
    id: 'lastName',
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Modh',
    component: FormInput,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    className: 'col-span-2',
    inputStyle: 'border-red-400',
    placeholder: 'yagnesh.modh@gmai.com',
    component: FormInput,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'strong password',
    type: 'password',
    component: FormInput,
  },
  {
    id: 'birthDate',
    name: 'birthDate',
    label: 'Birth Date',
    placeholder: 'strong password',
    component: FormDatePicker,
  },
  {
    id: 'gender',
    label: 'Gender',
    name: 'gender',
    placeholder: 'Please Select Gender',
    options: [
      {
        value: 'male',
        text: 'Male',
      },
      {
        value: 'female',
        text: 'Female',
      },
    ],
    component: FormSelect,
  },
  {
    id: 'genderRadio',
    label: 'Gender',
    name: 'genderRadio',
    placeholder: 'Please Select Gender',
    options: [
      {
        value: 'male',
        text: 'Male',
      },
      {
        value: 'female',
        text: 'Female',
      },
    ],
    component: FormRadioGroup,
  },
  {
    id: 'genderCheckbox',
    label: 'Gender',
    name: 'genderCheckbox',
    placeholder: 'Please Select Gender',
    options: [
      {
        value: 'male',
        text: 'Male',
      },
      {
        value: 'female',
        text: 'Female',
      },
    ],
    component: FormCheckboxInput,
  },
  {
    id: 'genderCombo',
    label: 'Gender',
    name: 'genderCombo',
    placeholder: 'Please Select Gender',
    options: [
      {
        value: 'male',
        text: 'Male',
      },
      {
        value: 'female',
        text: 'Female',
      },
    ],
    component: FormComboBox,
  },
];

function Register() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      genderCheckbox: [],
    },
  });

  const onSubmit = useCallback(async value => {
    await wait(5000);
    console.log(value);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2"
      >
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
