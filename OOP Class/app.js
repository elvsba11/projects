const inputAmount = document.getElementById('inputAmount');
const btnDeposit = document.getElementById('btnDeposit');
const btnWithdraw = document.getElementById('btnWithdraw');
const showBalance = document.getElementById('showBalance');
const show = document.getElementById('show');

class BankAccount {
  constructor (owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }

  depositAmount(amount) {
    this.balance += amount;
    this.showBalance();
  }

  withdrawAmount(amount) {
    if (amount > this.balance) {
    show.textContent = 'Insufficient balance!';
    return; // ← stop — huwag ituloy
    }
    this.balance -= amount;
    this.showBalance();
  }

  showBalance() {
    show.textContent = `Owner: ${this.owner} \n
                        Current Balance: ${this.balance}`;
  }
}

const account1 = new BankAccount('Juan', 0);

btnDeposit.addEventListener('click', () => {
  account1.depositAmount(Number(inputAmount.value))
});
btnWithdraw.addEventListener('click', () => {
  account1.withdrawAmount(Number(inputAmount.value))
});
showBalance.addEventListener('click', () => {
  account1.showBalance()
});