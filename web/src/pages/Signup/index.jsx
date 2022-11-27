import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Icon, Input } from '~/components'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
    name: yup.string().required('Preencha seu nome'),
    username: yup.string().required('Preencha seu nome de usuário'),
    email: yup.string().email('Informe um e-mail válido').required('Informe seu E-mail'),
    password: yup.string().required('Digite sua senha')
})

export const Signup = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})
    
    const formik = useFormik({
        onSubmit: async (values) => {

          const res = await axios({
                method: 'post',
                baseURL: 'http://localhost:3000',
                url: '/users',
                data: values
            })

            console.log(res.data)
        },
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema
    })

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true}/>
    }


    return (
        <div>
            <header className="p-4 border-b border-red-300">
                <div className="container max-w-xl flex justify-center ">
                    <img src="/imgs/logo-fundo-branco.svg" className="w-32 md:w-40" />
                </div>
            </header>

            <main className="container p-4 max-w-xl">
                <div className="p-4 flex space-x-4 items-center">
                    <a href="/">
                        <Icon className="h-6" name="back" />
                    </a>
                    <h2 className="text-xl font-bold">Crie sua conta</h2>
                </div>
                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        label="Seu nome"
                        placeholder="Digite seu nome"
                        eerror={formik.touched.namee && formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        type="text"
                        name="username"
                        label="Seu nome de usuário"
                        placeholder="Digite seu nome de usuário"
                        error={formik.touched.username && formik.errors.username}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        type="text"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite seu e-mail"
                        error={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite sua senha"
                        error={formik.touched.senha && formik.errors.senha}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <button type='submit'
                        className="block w-full text-center text-white bg-red-500 text-xl px-6 py-3 rounded-xl disabled:opacity-50"
                        disabled={!formik.isValid || formik.isSubmitting}
                    >
                       {formik.isSubmitting ? 'Carregando...' : 'Criar minha conta'}
                    </button>
                </form>
            </main>
        </div>
    )

}