import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Layout } from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { MetaProvider } from "@solidjs/meta";
import "./styles/global.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MetaProvider>
        <Router root={(props) => <Layout {...props} />}>
          <FileRoutes />
        </Router>
      </MetaProvider>
    </QueryClientProvider>
  );
}
