import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { config } from '../config';

const LoginPage = () => {
    const navigate = useNavigate();

    let LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, "Atleast 4 letters required").max(8, "Upto 8 letters are allowed").required(),
    })

    const submitHandler = (values) => {
        console.log(values)
        console.log(config)
        // const auth = getAuth();
        const { email, password } = values;
        // console.log(auth)
        signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                console.log(user)
            })
            .catch(err => {
                console.log(err)
            })

    }
    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <div>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={submitHandler}
                    >
                        {
                            (props) => {
                                let { values, handleChange, errors, touched, handleSubmit } = props
                                return (
                                    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                                        <div class="mb-4">
                                            <label className='block text-gray-700 text-sm font-bold mb-2'>Email Id</label>
                                            <input
                                                value={values.email}
                                                onChange={handleChange}
                                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                type="email"
                                                name="email"
                                                placeholder='Email ID'
                                            />
                                            {errors.email && touched.email ? <div className='text-red-500 text-xs italic'>{errors.email}</div> : null}
                                        </div>
                                        <div className='mb-4'>
                                            <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                                            <input
                                                value={values.password}
                                                onChange={handleChange}
                                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                type="password"
                                                name="password"
                                                placeholder='Enter Password'
                                            />
                                            {errors.password && touched.password ? <div className='text-red-500 text-xs italic'>{errors.password}</div> : null}
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                )
                            }
                        }

                    </Formik>
                </div>
            </div>
        </>
    )
}

export default LoginPage