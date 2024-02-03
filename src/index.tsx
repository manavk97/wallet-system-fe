import React from "react"

// Other library related imports
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

// Shared
import { GlobalStyle } from "shared/styles/global-style"

// Components
import WalletApp from "wallet-app"
import { LoginPage } from "wallet-app/components/login/login.page"

// Css
import "index.css"
import queryClient from "api/services/react-query-instance"

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<WalletApp />} />
          <Route path="wallet/*" element={<WalletApp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
