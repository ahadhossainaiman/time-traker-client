import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const PrivateRoute = ({ children }) => {
  const router = useRouter();

  // Check if the user is authenticated
  const { name, email, photo_url } = useSelector((state) => state.userSlice); // Replace with your actual authentication logic

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  // Render children only if authenticated
  return email ? children : null;
};

export default PrivateRoute;
