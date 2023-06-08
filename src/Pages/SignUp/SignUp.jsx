import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext)
  const navigate = useNavigate()
  const onSubmit = data => {
    // console.log(data)
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = {name: data.name, email: data.email}
            fetch('http://localhost:5000/users',{
              method: 'POST',
              headers: {
                'content-type':'application/json'
              },
              body: JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {
                  reset()
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'user created successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/')
                }
              })

          })
          .catch(error => console.log(error))
      })
  }
  return (
    <>
      <Helmet>
        <title> Speacial || signup</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign UP now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text"{...register("name", { required: true })} name="name" placeholder="your name" className="input input-bordered" />
                {errors.name && <span className="text-red-400">your name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">photoURL</span>
                </label>
                <input type="text"{...register("photoURL", { required: true })} placeholder="your photo url" className="input input-bordered" />
                {errors.photoURL && <span className="text-red-400">your photo is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email"{...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                {errors.email && <span className="text-red-400">your email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password"{...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /[A-Za-z]+/ })} name="password" placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
                {errors.password?.type === 'minlength' && <p className="text-red-500">Password must be 6 characters required</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-500">Password must be one uppercase and one lowercase required</p>}
                {errors.password?.type === 'maxlength' && <p className="text-red-500">Password must be less then 6 characters required</p>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" value="signup" className="btn btn-primary" />
              </div>
            </form>
            <p>Already Have An Account? <Link to='/login'>login</Link></p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div></>
  );
};

export default SignUp;