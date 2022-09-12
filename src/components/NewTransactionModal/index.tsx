import {FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outComeImg from '../../assets/outcome.svg'
import { api } from '../../services/api';
import {Container,TransctionTypeContainer,RadioBox } from './styles'
import {useTransactions} from '../../hooks/useTransactions'

interface NewTransactionModalProps{
    isOpen:boolean;
    onRequestClose:()=>void
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const {createTransaction} = useTransactions();
    const [title, setTitle] = useState('');
    const [amount,setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type,setType] = useState('deposit')


    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();
       
        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        
        setTitle('');
        setAmount(0)
        setCategory('')
        setType('deposit')

        onRequestClose()
    }


    return(
        <Modal overlayClassName="react-modal-overlay" className="react-modal-content" isOpen={isOpen}
         onRequestClose={onRequestClose}>
   
        <button type='button'
        onClick={onRequestClose}
         className="react-modal-close">

            <img src={closeImg} alt="fechar modal" />

        </button>
        
        <Container onSubmit={handleCreateNewTransaction}>
        <h2> Cadastrar Transação</h2>

        <input value={title}
         onChange={event=> setTitle(event.target.value)} 
         placeholder='Titulo' />

        <input value={amount} 
        type='number' placeholder='Valor' 
         onChange={event=>setAmount(Number(event.target.value))} />

        <TransctionTypeContainer>
            
            <RadioBox 
             type='button'
             onClick={()=>{setType('deposit')}} 
             isActive={type === 'deposit'}
             activeColor="green"
           >
                
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
            </RadioBox>

            <RadioBox 
            onClick={()=>{setType('withdraw')}} 
             type='button'
             isActive={type === 'withdraw'}
             activeColor="red"
             >

            <img src={outComeImg} alt="Saida" />
            <span>Saida</span>
            </RadioBox>
        </TransctionTypeContainer>

        <input value={category}
         onChange={event=> setCategory(event.target.value)} placeholder='Categoria' />
        <button type='submit'>Cadastrar</button>

        </Container>
        </Modal> 
    )
}