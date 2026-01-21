import { useState } from 'react'
import { Navigate } from 'react-router';
import { usePageError } from '../hooks/ErrorPage.tsx';
import { authService } from '../services/authService.ts';
import { useAuth } from '../components/AuthProvider.tsx';

export const HomePage = () => {
  const [name, setName] = useState('');
  const [error, setError] = usePageError('');
  const { currentUser, setCurrentUser} = useAuth();
  const [loading, setLoading] = useState(false);

  const validateName = (name) => {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return 'Enter your name';
  }

  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }

  return '';
};
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  const validateError = validateName(name);
  if (validateError) {
    setError(validateError);
    return;
  }

  let user = null;
  setLoading(true);

  try {
    user = await authService.login(name);

    if (!user) {
      setError('Login failed');
      return;
    }


    localStorage.setItem(
      'currentUser',
      JSON.stringify({ id: user.id, name: user.name })
    );

    setCurrentUser(user);

  } catch (err: any) {
    setError(err.message || 'Unexpected error');

  } finally {
    setLoading(false);
  }
};



if (currentUser) {
    return <Navigate to={"/rooms"}/>
  }

  return (<>

    <h1>Chat Page</h1>
  <label htmlFor="name" className="label">
                Enter  name
              </label>
    <form
      className="field is-horizontal"
      onSubmit={handleSubmit
      }
    >
      <input
        id='name'
        type="text"
        className="input"
        placeholder="Enter  name"
        value={name}
        onChange={event => setName(event.target.value)}

      />

      <button className="button"
        type='submit'
     disabled={Boolean(error) || name.trim().length === 0 || loading}>Registration</button>
    </form>
  {error && <h1>{error}</h1>}</>)
}
