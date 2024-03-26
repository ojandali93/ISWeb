import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getCurrentUser, signIn, signUp, signOut } from 'aws-amplify/auth';
import axios from 'axios';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'

const accessOptions = {
  'PHG620I': {
    'code': 'PHG620I',
    'company': 'PHG',
    'privileges': 'staff',
    'department': 'intake'
  },
  'PHG620MI': {
    'code': 'PHG620MI',
    'company': 'PHG',
    'privileges': 'manager',
    'department': 'intake'
  },
  'PHG620B': {
    'code': 'PHG620B',
    'company': 'PHG',
    'privileges': 'staff',
    'department': 'billing'
  },
  'PHG620A': {
    'code': 'PHG620A',
    'company': 'PHG',
    'privileges': 'admin',
    'department': 'admin'
  }
}

interface accessCode {
  code: string,
  company: string,
  privileges: string,
  department: string
}

interface UserPassthrough {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

interface UserDetails {
  username: string,
  password: string
}

interface Account {
  userId: string | null | undefined;
  username: string | null | undefined;
}

interface Profile {
  company: string | null;
  creation_date: string | null;
  department: string | null;
  email: string | null;
  last_login: string | null;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  privileges: string | null;
  userid: string | null;
}

interface AuthContextType {
  currentUser: Account;
  currentProfile: Profile;
  authLoading: boolean;
  validLogin: boolean;
  validAccessCode: boolean;
  invalidEmail: boolean;
  confirmedEmail: boolean;
  createdAccount: boolean;
  accessCode: accessCode,
  signInUser: ({username, password}: UserDetails) => void;
  validateAccessCode: (accessCode: string) => void;
  removeAccessCode: () => void;
  createNewUser: ({
    firstName,
    lastName,
    email,
    password
  }: UserPassthrough) => void;
  grabCurrentUser: () => void;
  signOutUser: () => void;
  resetConfirmEmail: () => void;
  confirmEmailCode: (confirmationCode: string) => void;
  grabCurrentUserProfile: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: { userId: null, username: null },
  currentProfile: {
    company: null,
    creation_date: null,
    department: null,
    email: null,
    last_login: null,
    first_name: null,
    last_name: null,
    name: null,
    privileges: null,
    userid: null,
  },
  authLoading: false,
  validLogin: true,
  validAccessCode: false,
  confirmedEmail: false,
  createdAccount: false,
  invalidEmail: false,
  accessCode: {code: '', company: '', privileges: '', department: ''},
  confirmEmailCode: () => {},
  signInUser: () => {},
  createNewUser: () => {},
  removeAccessCode: () => {},
  signOutUser: () => {},
  resetConfirmEmail: () => {},
  validateAccessCode: () => {},
  grabCurrentUser: () => {},
  grabCurrentUserProfile: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  return useContext(AuthContext);
}

// the main provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState<string>('');

  const [currentUser, setCurrentUser] = useState<Account>({
    userId: null,
    username: null,
  });

  const [currentProfile, setCurrentProfile] = useState<Profile>({
    company: null,
    creation_date: null,
    department: null,
    email: null,
    last_login: null,
    first_name: null,
    last_name: null,
    name: null,
    privileges: null,
    userid: null,
  });
  
  const [accessCode, setAccessCode] = useState<accessCode>({
    code: '',
    company: '',
    privileges: '',
    department: ''
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [validLogin, setValidLogin] = useState<boolean>(true);
  const [validAccessCode, setValidAccessCode] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
  const [createdAccount, setCreatedAccount] = useState<boolean>(false)
  const [confirmedEmail, setConfirmedEmail] = useState<boolean>(false)

  const signInUser = (userInfo: UserDetails) => {
    const { username, password } = userInfo;
    console.log('Attempting to sign in with username:', username);
  
    setAuthLoading(true);
  
    signIn({ username, password })
      .then((user) => {
        console.log('Sign-in successful:', user);
        grabCurrentUser();
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
        setValidLogin(false); // Set validLogin state to false
        setAuthLoading(false);
      });
  };

  const grabCurrentUser = () => {
    setAuthLoading(true);
    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
        setAuthLoading(false);
        navigate('/')
      })
      .catch((error) => {
        setAuthLoading(false);
      });
  };

  const grabCurrentUserProfile = (userId: string) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/users/${userId}`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        setCurrentProfile(response.data.data);
        setAuthLoading(false);
      })
      .catch((error) => {
        setAuthLoading(false);
      });
  };

  const validateAccessCode = (accessCode: string) => {
    console.log('checking code')
    if(accessOptions[accessCode as keyof typeof accessOptions]){
      console.log('valid code')
      setAccessCode(accessOptions[accessCode as keyof typeof accessOptions])
      setValidAccessCode(true)
    } 
  }

  const removeAccessCode = () => {
    setValidAccessCode(false)
  }

  const createNewUser = (userPassthrough: UserPassthrough) => {
    setEmail(userPassthrough.email)
    const signupData = {
      username: userPassthrough.email,
      email: userPassthrough.email,
      password: userPassthrough.password,
      first_name: userPassthrough.firstName,
      last_name: userPassthrough.lastName,
      full_name: `${userPassthrough.firstName} ${userPassthrough.lastName}`,
      options: {
        userAttributes: {
          email: userPassthrough.email,
          given_name: userPassthrough.firstName,
          family_name: userPassthrough.lastName,
          nickname: userPassthrough.firstName,
          name: `${userPassthrough.firstName} ${userPassthrough.lastName}`
        }
      }
    }

    signUp(signupData)
      .then((currentUser) => {
        console.log(currentUser.userId)
        setCurrentUser({userId: currentUser.userId, username: currentUser.userId})
        createProfile(currentUser.userId, userPassthrough)
      })
      .catch((err) => {
        if(err.name === 'UsernameExistsException'){
          setInvalidEmail(true)
        }
        console.log(JSON.stringify(err));
      });
  }

  const createProfile = (userId: string | undefined, userPassthrough: UserPassthrough) => {
    console.log('creating new profiel now')
    let data = {
      "first_name": userPassthrough.firstName,
      "last_name": userPassthrough.lastName,
      "name": `${userPassthrough.firstName} ${userPassthrough.lastName}`,
      "email": userPassthrough.email,
      "status": 'active',
      "privileges": accessCode.privileges,
      "department": accessCode.department,
      "company": accessCode.company,
      "user_id": userId
    };

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/users/${userId}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request(config)
      .then((response) => {

        console.log('new profile created')
        navigate('/auth/confirmation')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const confirmEmailCode = (confirmationCode: string) => {
    confirmSignUp({
        username: email,
        confirmationCode: confirmationCode
    })
    .then(response => {
      navigate('/auth/login')
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  };

  const resetConfirmEmail = () => {
    resendSignUpCode({
      username: email
    })
    .then(response => {
      console.log('none')
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  }

  const signOutUser = () => {
    signOut()
      .then((response) => {
        setCurrentUser({ userId: null, username: null })
        navigate('/auth/login')
      })
      .catch((error) => {
        console.log(error)
        setValidLogin(false)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentProfile,
        authLoading,
        validLogin,
        validAccessCode,
        invalidEmail,
        createdAccount,
        confirmedEmail,
        accessCode,
        signInUser,
        createNewUser,
        removeAccessCode,
        validateAccessCode,
        signOutUser,
        grabCurrentUser,
        confirmEmailCode,
        resetConfirmEmail,
        grabCurrentUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
