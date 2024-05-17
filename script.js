class Budget {
    constructor() {
        this.incomes = [];
        this.expenses = [];
        this.totalIncome = 0;
        this.totalExpenses = 0;
    }

    addIncome(description, amount) {
        if (description && amount > 0) {
            this.incomes.push({ description, amount });
            this.totalIncome += amount;
            this.updateBudget();
            this.renderItem('income', description, amount);
        }
    }

    addExpense(description, amount) {
        if (description && amount > 0) {
            this.expenses.push({ description, amount });
            this.totalExpenses += amount;
            this.updateBudget();
            this.renderItem('expense', description, amount);
        }
    }

    updateBudget() {
        const totalBudget = this.totalIncome - this.totalExpenses;
        document.getElementById('amount-earned').innerText = this.totalIncome;
        document.getElementById('amount-spent').innerText = this.totalExpenses;
        document.getElementById('amount-avaliable').innerText = totalBudget;
    }

    renderItem(type, description, amount) {
        const container = type === 'income' ? document.getElementById('income-container') : document.getElementById('expenses-container');
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const descriptionElement = document.createElement('h4');
        descriptionElement.innerText = description;

        const amountElement = document.createElement('div');
        amountElement.classList.add(`item-${type}`);
        amountElement.innerHTML = `<p class="${type}-symbol">$</p><span class="${type}-amount">${amount}</span>`;

        const deleteButton = document.createElement('i');
        deleteButton.classList.add('fa', 'fa-trash-o');
        deleteButton.addEventListener('click', () => {
            container.removeChild(itemDiv);
            this.removeItem(type, amount);
        });

        itemDiv.appendChild(descriptionElement);
        itemDiv.appendChild(amountElement);
        itemDiv.appendChild(deleteButton);
        container.appendChild(itemDiv);
    }

    removeItem(type, amount) {
        if (type === 'income') {
            this.totalIncome -= amount;
            this.incomes = this.incomes.filter(item => item.amount !== amount);
        } else {
            this.totalExpenses -= amount;
            this.expenses = this.expenses.filter(item => item.amount !== amount);
        }
        this.updateBudget();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const budget = new Budget();

    document.getElementById('add-income').addEventListener('click', () => {
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        if (description && amount > 0) {
            budget.addIncome(description, amount);
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
        } else {
            alert("Please enter a valid income description and amount.");
        }
    });

    document.getElementById('add-expense').addEventListener('click', () => {
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        if (description && amount > 0) {
            budget.addExpense(description, amount);
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
        } else {
            alert("Please enter a valid expense description and amount.");
        }
    });
});
