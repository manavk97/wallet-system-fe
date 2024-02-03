import React from "react"

// Other library related imports
import { Routes, Route } from "react-router-dom"

// Shared
import "shared/helpers/load-icons"

// Components
import { MainHeader } from "wallet-app/components/main-header/main-header.component"

// Pages
import { TransactionPage } from "wallet-app/components/transaction/transaction.page"
import { WalletPage } from "./components/wallet/wallet.page"

function App() {
  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="/" element={<WalletPage />} />
        <Route path="transaction" element={<TransactionPage />} />
        <Route path="*" element={<div>No Match</div>} />
      </Routes>
    </>
  )
}

export default App
