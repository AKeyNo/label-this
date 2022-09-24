import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

type Account = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Account>();
  const { data: session } = useSession();
  const router = useRouter();

  const createAccount = async (account: Account) => {
    console.log(account);
    const { email, password, name } = account;

    try {
      const post = await axios.post('/api/user/create', {
        email,
        password,
        name,
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  });

  return (
    <form onSubmit={handleSubmit(createAccount)}>
      <div>
        <input
          id='sign-up-name'
          {...register('name', {
            required: true,
          })}
        />
        {errors.email && (
          <span id='sign-up-name-error' role='alert'>
            This field is required!
          </span>
        )}
      </div>
      <div>
        <input
          id='sign-up-email'
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
          })}
        />
        {errors.email && (
          <span id='sign-up-email-error' role='alert'>
            This is not a valid email!
          </span>
        )}
      </div>
      <div>
        <input
          id='sign-up-password'
          {...register('password', {
            required: true,
            minLength: parseInt(process.env.MINIMUM_PASSWORD_LENGTH ?? '16'),
          })}
        />
        {errors.password && (
          <span id='sign-up-password-error' role='alert'>
            The password must be at least 16 characters long!
          </span>
        )}
      </div>
      <div>
        <input
          id='sign-up-confirm-password'
          {...register('confirmPassword', {
            required: true,
            validate: {
              samePassword: (v: string) => watch('password') == v,
            },
          })}
        />
        {errors.confirmPassword && (
          <span id='sign-up-confirm-password-error' role='alert'>
            The passwords do not match!
          </span>
        )}
      </div>
      <div>
        <input id='sign-up-submit' type='submit' />
      </div>
    </form>
  );
};

export default SignUp;
