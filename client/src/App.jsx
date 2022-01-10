import './App.css'
import { Footer, Navbar, Services, Transactions, Welcome } from './components'
import TransactionProvider from './context/TransactionContext'

const App = () => {
  
  return (
    <TransactionProvider>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome/>
        </div>
        <Services/>
        <Transactions/>
        <Footer/>
      </div>
    </TransactionProvider>
  )
}

export default App
