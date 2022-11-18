import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import FormSchema from './FormSchema';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import './App.css'
import axios from 'axios'

const RestorePassword = () => {

    const { usuarioId, token } = useParams()
    const [success, setSuccess] = useState()
    const [error, setError] = useState(null)
    const [isButtonEnabled, setIsButtonEnabled] = useState(true)

    const requestPasswordRecovery = (password) => {
        setIsButtonEnabled(false)
        axios.post(`https://idelika.xneighbor.com/api/auth/password-reset/${usuarioId}/${token}`, {
            password,
        }, {
            headers: {
                "method": "POST",
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setSuccess('success')
            setError(null)
        }).catch(error => {
            setSuccess('failed')
            setError(error.response.data.message || 'Error en el servicio, por favor intente más tarde.')
        })
    }
    

    return (
        <div className="App">

        {
            ! success ?
                <div className="form">
                    <Formik
                        initialValues={{
                        password: '',
                        passwordConfirmation: '',
                        }}
                        validationSchema={FormSchema}
                        onSubmit={values => {
                        
                        requestPasswordRecovery(values.password, values.passwordConfirmation)
                        }}
                    >

                        {({ errors, touched }) => (
                        <Form >

                            <Image src={'/../Idelika-logo.svg'} style={{ marginBottom: '1rem' }}/>
                            <h3 style={{ marginBottom: '2rem' }}>Recuperación de cuenta</h3>

                            <Card>

                            <Card.Header style={{ backgroundColor: '#F9D4CD' }}>
                                Nueva contraseña
                            </Card.Header>

                            <Card.Body style={{ display: 'flex', flexDirection: 'column', width: '320px', maxWidth: '320px' }}>

                                <div className='d-flex flex-column text-left my-2 align-items-start'>
                                <div>Contraseña</div>
                                <Field name="password" style={{ width: '100%' }} type={'password'}/>
                                    {errors.password && touched.password ? (
                                    <div className='text-wrap text-start' style={{ fontSize: '0.8rem', color: 'red' }}>{errors.password}</div>
                                    ) : null}
                                </div>
                                
                                <div className='d-flex flex-column text-left my-2 align-items-start'>
                                <div>Confirma la contraseña</div>
                                <Field name="passwordConfirmation" style={{ width: '100%' }} type={'password'}/>
                                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                                    <div className='text-wrap text-start' style={{ fontSize: '0.8rem', color: 'red' }}>{errors.passwordConfirmation}</div>
                                ) : null}
                                </div>

                                <Button
                                    variant='primary'
                                    style={{ marginTop: '1rem' }}
                                    type={'submit'}
                                    disabled={!isButtonEnabled}                                
                                >
                                Cambiar
                                </Button>

                            </Card.Body>

                            </Card>

                        </Form>
                        )}      

                    </Formik>
                </div>
                :
                <div className="form">
                    <Card>

                        <Card.Header style={{
                            backgroundColor: success === 'success' ? '#28a745' : '#F9D4CD',
                            color: success === 'success' ? 'white' : 'black',
                            }}>
                        {
                            success === 'success' ?
                                'Contraseña renovada'
                            :
                                'Error'
                        }
                        </Card.Header>

                        <Card.Body style={{ display: 'flex', flexDirection: 'column', width: '320px', maxWidth: '320px' }}>

                            <div className='d-flex flex-column text-left my-2 align-items-center'>
                            {
                                success === 'success' ?
                                    '¡Tu contraseña ha sido renovada con éxito y ahora puedes utilizarla para iniciar sesión en la app!'
                                :
                                    error
                            }
                            </div>

                        </Card.Body>

                    </Card>
                </div>
        }
            

            
        
        </div>
    )
    
}

export default RestorePassword