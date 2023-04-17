import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Cookies from 'js-cookie'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token is stored in cookie or local storage
    const token = Cookies.get('token');

    if (!token) {
      // User is not authenticated, redirect to login page
      router.push('/login');
    } else {
      setAuthenticated(true)
    }
  }, []);

  return authenticated;
}
