import '../../../src/input.css';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResetPassword, resetPassword } from '../../Redux/apiCalls/passwordApiCall';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { userId, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError}  = useSelector(state => state.password);
 
  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  },[userId,token,dispatch]);
  // Form Submit Handler
  const submitHandler =  (e) => {
    e.preventDefault();
    if (password.trim() === '') return toast.error('Password is required');
      dispatch(resetPassword(password, { userId, token }));
     navigate('/login'); // Redirect to login on success 
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style={{ marginBottom: '6rem' }}>
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Password</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new Password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
