import React, { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import closeIcon from '../../assets/close.svg';
import icomeIcon from '../../assets/income.svg';
import outcomeIcon from '../../assets/outcome.svg';
import { api } from '../../services/api';
import { TransactionsContext } from '../../TransactionContex';

import { Container,TransactionTypeContainer,RadioBox } from './styles';

interface NewTransactionModalProps{
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount]  = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  const {createTransaction} = useContext(TransactionsContext)
  

  
  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault(); // bloqueando refresh da pagina depois de enviar o formulario
    createTransaction({
      title,
      amount,
      category,
      type
    })
  }
  return (
    <Modal           
          isOpen={isOpen}
          onRequestClose={onRequestClose} 
          overlayClassName='react-modal-overlay' 
          className="react-modal-content"
        >
          <button type="button" onClick={onRequestClose} className="react-modal-close">
            <img src={closeIcon} alt="Fechar Modal"/>
          </button>
          <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>

            <input 
              placeholder="Título"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />

            <input placeholder="Valor" 
              type="number"
              value={amount}
              onChange={event => setAmount(Number(event.target.value))}
            />

            <TransactionTypeContainer>
              <RadioBox 
                type="button" 
                onClick={ ()=>{setType('deposit')}} 
                isActive = {type==='deposit'}
                activeColor='green'
              >
                <img src={icomeIcon} alt="Entrada" />
                <span>Entrada</span>
              </RadioBox>

              <RadioBox 
              type="button" 
              onClick={ ()=>{setType('withdraw')}}
              isActive = {type==='withdraw'}
              activeColor='red'
              >
                <img src={outcomeIcon} alt="Saida" />
                <span>Saída</span>
              </RadioBox>
            </TransactionTypeContainer>

            <input 
              placeholder="Categoria"
              value={category}
              onChange={event => setCategory(event.target.value)}
            />
            <button type="submit">Cadastrar</button>
          </Container>
    </Modal>
  );
};

