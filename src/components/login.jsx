import React from 'react';
import './login.css';
import  * as yup from 'yup';
import {useForm} from 'react-hook-form';               // npm install react-hook-form
import {yupResolver} from '@hookform/resolvers/yup';    // npm install @hookform/resolvers



function Login() {

    const schema = yup.object().shape({
        username: yup.string().required('username is required'),
        password: yup.string().required('password is required').min(8, 'password must be at least 8 characters')
    })


    const {register,handlesubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onsubmit = (data) => {
        console.log(data)}

  return (
    <form action="" onSubmit={handlesubmit(onsubmit)}>
        <>
        <input type="text" {...register('username')} placeholder='username'/>
        <p>{errors.username?.message}</p>
        </>

        <>
        <input type="password" {...register('password')}  placeholder='password'/>
        <p>{errors.password?.message}</p>
        </>

        <input type="submit" className='submitBtn' value="submit"/>
    </form>
  )
}

// export default Login