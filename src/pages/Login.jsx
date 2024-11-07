// import React, { useState } from 'react';
// import { googleLogin, emailLogin, emailRegister, logout } from '../firebase/firebase'; // Import Firebase functions

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Google Login
//   const handleGoogleLogin = async () => {
//     try {
//       const user = await googleLogin();
//       console.log('User logged in via Google:', user);
//     } catch (error) {
//       console.error('Google login failed:', error);
//     }
//   };

//   // Email Login
//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await emailLogin(email, password);
//       console.log('User logged in via email:', user);
//     } catch (error) {
//       console.error('Email login failed:', error);
//     }
//   };

//   // Email Registration
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await emailRegister(email, password);
//       console.log('User registered:', user);
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };

//   // Logout
//   const handleLogout = async () => {
//     try {
//       await logout();
//       console.log('User logged out');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login / Register</h2>
//       <button onClick={handleGoogleLogin}>Login with Google</button>
//       <form onSubmit={handleEmailLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <button onClick={handleRegister}>Register</button>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from 'react';
import { googleLogin, emailLogin, emailRegister, logout } from '../firebase/firebase'; // Import Firebase functions
import { Button, Input, Form, Space, Typography, notification } from 'antd'; // Ant Design Components

const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
      console.log('User logged in via Google:', user);
    } catch (error) {
      console.error('Google login failed:', error);
      notification.error({ message: 'Google login failed', description: error.message });
    }
  };

  // Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await emailLogin(email, password);
      console.log('User logged in via email:', user);
    } catch (error) {
      console.error('Email login failed:', error);
      notification.error({ message: 'Email login failed', description: error.message });
    }
  };

  // Email Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await emailRegister(email, password);
      console.log('User registered:', user);
    } catch (error) {
      console.error('Registration failed:', error);
      notification.error({ message: 'Registration failed', description: error.message });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      notification.error({ message: 'Logout failed', description: error.message });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-lg bg-white w-full sm:w-96">
        <Title level={2} className="text-center mb-6">Login / Register</Title>

        {/* Google Login Button */}
        <Button
          className="w-full mb-4"
          type="primary"
          size="large"
          icon={<i className="fab fa-google" />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>

        {/* Email Login Form */}
        <Form onSubmitCapture={handleEmailLogin} layout="vertical">
          <Form.Item label="Email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              size="large"
              required
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              size="large"
              required
            />
          </Form.Item>

          <Space direction="vertical" size="middle" className="w-full">
            <Button type="primary" block htmlType="submit" size="large">
              Login
            </Button>
            <Button
              type="default"
              block
              size="large"
              onClick={handleRegister}
              className="mt-3"
            >
              Register
            </Button>
          </Space>
        </Form>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <Button type="link" onClick={handleLogout} size="large">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
