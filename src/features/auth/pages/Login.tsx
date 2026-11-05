import {AuthCard} from "../components/AuthCard";

const Login = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <AuthCard isLogin={true}/>
    </div>
  )
}

export default Login
