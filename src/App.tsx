import AuthProvider from "./features/auth/providers/AuthProvider";
import { ThemeProvider } from "./features/theme/providers/ThemeProvider";
import { AppRouter } from "./router";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
