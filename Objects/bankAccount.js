const account = {
  owner: "John",
  balance: 10000,
  transactions: []
};

function depositMoney(checkAccount, deposit) {

  if(checkAccount.owner === "John") {
    const addDeposit = deposit + checkAccount.balance;
    checkAccount.balance = addDeposit
    checkAccount.transactions.push(addDeposit);
    return `Transaction Successfully!\n
            Deposit: ${deposit}\n
            New Balance: ${addDeposit}`
  }else {
    return "No account Found";
  }

}

function withdrawMoney(checkAccount, withdraw) {

  if(checkAccount.owner === "John") {
    if(checkAccount.balance >= withdraw) {
      const cashOut = checkAccount.balance - withdraw;
      checkAccount.balance = cashOut
      checkAccount.transactions.push(cashOut);
      return `Transaction Successfully!\n
              Withdraw: ${withdraw}\n
              New Balance: ${cashOut}`
    } else {
      return "Insufficient balance!";
    }
  }else {
    return "No account Found";
  }

}

console.log(depositMoney(account,5000));
console.log(withdrawMoney(account,5000));
console.log(withdrawMoney(account,3000));
console.log(withdrawMoney(account,3000));
console.log(withdrawMoney(account,3000));
console.log(withdrawMoney(account,3000));
console.log(account.transactions)