import AuthProvider from "./features/auth/providers/AuthProvider";
import { AppRouter } from "./router";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
