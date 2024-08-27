import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionChart } from "./components";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <TransactionChart />
    </QueryClientProvider>
  );
}

export default App;
