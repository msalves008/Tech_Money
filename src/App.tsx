import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/global";
import { createServer, Model } from "miragejs";
import Modal from 'react-modal';
import {  useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsContext, TransactionsProvider } from "./TransactionContex";


createServer({
  models: {
    transaction: Model,
  },
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Criação de landing page',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 600,
          createdAt: new Date('2021-10-15 09:00:00')
        },
        {
          id: 2,
          title: 'Teclado',
          type: 'withdraw',
          category: 'Periféricos',
          amount: 249,
          createdAt: new Date('2021-10-15 09:00:00')
        }
    ]
    })
  },

  routes(){
    this.namespace = 'api';
    this.get('/transactions',()=>{
      return this.schema.all('transaction')
    })
    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction',data);
    })
  }
})
Modal.setAppElement("#root");

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false);
 

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }
  return (
    <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
        <Dashboard/>
        <NewTransactionModal 
          isOpen={isNewTransactionModalOpen} 
          onRequestClose={handleCloseNewTransactionModal}
        />
        <GlobalStyles/>
    </TransactionsProvider>
  );
}