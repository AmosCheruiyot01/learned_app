import React from 'react'
import  * as yup from 'yup';
import {useForm} from 'react-hook-form';               // npm install react-hook-form
import {yupResolver} from '@hookform/resolvers/yup';    // npm install @hookform/resolvers


function Register() {

    const schema = yup.object().shape({
        username: yup.string().required('username is required'),
        email: yup.string().required('email is required').email('email is invalid'),
        password: yup.string().required('password is required').min(8, 'password must be at least 8 characters')
    });

const{register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
});

const onSubmit = (data) => {
    console.log(data)}

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
        <p className='banner'>register</p>
       
<>
<input type="text" {...register('username')} placeholder='username' />
        <p>{errors.username?.message}</p>
</>

<>
<input type="email" {...register('email')} placeholder='email' />
        <p>{errors.email?.message}</p>
</>

<>
<input type="password" {...register('password')} placeholder='password' />
        <p>{errors.password?.message}</p>

        <input type="submit" className = 'submitBtn' value="submit"/>
</>

    </form>
  )
}

export default Register