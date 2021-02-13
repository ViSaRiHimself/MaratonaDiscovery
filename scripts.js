const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }

}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '26/01/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '26/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '26/01/2021'
    }
]

const Transaction = {
    all: transactions,
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },
    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },
    incomes() {
        let income = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })
        return income
    },
    expenses() {
        let expense = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
    },
    total() {
        return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.currencyFormat(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
        `
        return html
    },
    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.currencyFormat(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.currencyFormat(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.currencyFormat(Transaction.total())
    },
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ''
    }
}

const Utils = {
    currencyFormat(value) {
        const signal = Number(value) < 0 ? "-" : "+"

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + ' ' + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    /* formatData(){
        //
    }, */
    validateFields(){
        const {description, amount, date} = Form.getValues()

        if(description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
                throw new Error("Por favor, preencha todos os campos.")
            }
    },
    submit(event) {
        event.preventDefault()
        try{
            Form.validateFields()
        }catch(error) {
            alert(error.message)
        }
        
        /* Form.formatData() */
    }
}

const App = {
    init() {

        Transaction.all.forEach(function (transaction) {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()

        Transaction.add({
            id: 8,
            description: 'X',
            amount: 200,
            date: '26 / 01 / 2021',
        })
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()
