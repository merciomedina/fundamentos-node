import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    const balance = this.getBalance();

    return { transactions, balance };
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const income = transactions.reduce(function (sum, record) {
      if (record.type == 'income') return sum + record.value;
    }, 0);

    const outcome = transactions.reduce(function (sum, record) {
      if (record.type == 'outcome') return sum + record.value;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
