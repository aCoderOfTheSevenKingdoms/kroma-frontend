import { AuthCard } from "../components/AuthCard"

const Register = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <AuthCard isLogin={false}/>
    </div>
  )
}

export default Register