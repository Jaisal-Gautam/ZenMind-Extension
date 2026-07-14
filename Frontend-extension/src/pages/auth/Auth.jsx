import { authApi } from "@/api/auth.api";
import { setAuth, getAuth } from "@/utils/chromeStorage";
export default function Auth() {
  const handleRegister = async () => {
    try {
      const response = await authApi.register({
        email: "jaisalgautam007@gmail.com",
        username: "JaisalGautam",
        password: "Jaisal@130905",
      });

      console.log("Register Success:", response);
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  const handleLogin = async () => {
  try {
    const response = await authApi.login({
      username: "JaisalGautam",
      password: "Jaisal@130905",
    });

    await setAuth({
      user: response.user,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    const auth = await getAuth();

    console.log(auth);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="p-6 space-x-4">
      <button
        className="rounded-md bg-black px-4 py-2 text-white"
        onClick={handleRegister}
      >
        Register
      </button>

      <button
        className="rounded-md bg-black px-4 py-2 text-white"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}