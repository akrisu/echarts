"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { TransactionChart } from "./components";
import { ErrorBoundary } from "react-error-boundary";

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.log(error.message),
  }),
});

function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryClientProvider client={client}>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <button onClick={() => resetErrorBoundary()}>Try again</button>
          </div>
        )}
      >
        <TransactionChart />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
