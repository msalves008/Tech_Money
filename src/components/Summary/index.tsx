import { Container } from "./styles"
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useContext } from "react";
import { TransactionsContext } from "../../TransactionContex";

export function Summary(){
  const {transactions} = useContext(TransactionsContext);

  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="entradas" />
        </header>
        <strong>R$5.200,00</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>-R$1.200,00</strong>
      </div>
      <div className="higthLigt-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>R$4.000,00</strong>
      </div>
    </Container>
  )
}