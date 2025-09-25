const items = [];
let budgetDate = '';

function addItem() {
    const quantity = parseFloat(document.getElementById('quantity').value);
    const description = document.getElementById('description').value;
    const unitPriceWinner = parseFloat(document.getElementById('unitPriceWinner').value);
    const unitPrice2 = parseFloat(document.getElementById('unitPrice2').value);
    const unitPrice3 = parseFloat(document.getElementById('unitPrice3').value);

    if (isNaN(quantity) || quantity <= 0 || isNaN(unitPriceWinner) || isNaN(unitPrice2) || isNaN(unitPrice3) || description.trim() === "") {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const totalPriceWinner = quantity * unitPriceWinner;
    const totalPrice2 = quantity * unitPrice2;
    const totalPrice3 = quantity * unitPrice3;

    const item = {
        quantity,
        description,
        unitPrices: {
            winner: unitPriceWinner,
            budget2: unitPrice2,
            budget3: unitPrice3
        },
        totalPrices: {
            winner: totalPriceWinner,
            budget2: totalPrice2,
            budget3: totalPrice3
        }
    };
    items.push(item);
    updateTable();
    
    document.getElementById('quantity').value = '';
    document.getElementById('description').value = '';
    document.getElementById('unitPriceWinner').value = '';
    document.getElementById('unitPrice2').value = '';
    document.getElementById('unitPrice3').value = '';
}

function updateTable() {
    const tableBody = document.getElementById('itemsTable').querySelector('tbody');
    tableBody.innerHTML = '';
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    items.forEach((item, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><span class="view-quantity">${item.quantity}</span><input type="number" class="edit-quantity" value="${item.quantity}" style="width: 80px; display:none;"></td>
            <td>${item.description}</td>
            <td><span class="view-price" data-type="winner">${formatter.format(item.unitPrices.winner)}</span><input type="number" class="edit-price" data-type="winner" value="${item.unitPrices.winner}" style="width: 80px; display:none;"></td>
            <td><span class="view-price" data-type="budget2">${formatter.format(item.unitPrices.budget2)}</span><input type="number" class="edit-price" data-type="budget2" value="${item.unitPrices.budget2}" style="width: 80px; display:none;"></td>
            <td><span class="view-price" data-type="budget3">${formatter.format(item.unitPrices.budget3)}</span><input type="number" class="edit-price" data-type="budget3" value="${item.unitPrices.budget3}" style="width: 80px; display:none;"></td>
            <td>
                <button class="btn edit-btn" data-index="${index}">Editar</button>
                <button class="btn remove-btn" data-index="${index}">Remover</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            toggleEdit(index, event.target);
        });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            removeItem(index);
        });
    });
}

function toggleEdit(index, button) {
    const row = button.closest('tr');
    const item = items[index];

    if (button.textContent === 'Salvar') {
        const newQuantity = parseFloat(row.querySelector('.edit-quantity').value);
        const newPriceWinner = parseFloat(row.querySelector('.edit-price[data-type="winner"]').value);
        const newPrice2 = parseFloat(row.querySelector('.edit-price[data-type="budget2"]').value);
        const newPrice3 = parseFloat(row.querySelector('.edit-price[data-type="budget3"]').value);
        
        if (isNaN(newQuantity) || isNaN(newPriceWinner) || isNaN(newPrice2) || isNaN(newPrice3) || newQuantity <= 0) {
            alert("Por favor, insira valores válidos.");
            return;
        }

        item.quantity = newQuantity;
        item.unitPrices.winner = newPriceWinner;
        item.unitPrices.budget2 = newPrice2;
        item.unitPrices.budget3 = newPrice3;

        item.totalPrices.winner = item.quantity * newPriceWinner;
        item.totalPrices.budget2 = item.quantity * newPrice2;
        item.totalPrices.budget3 = item.quantity * newPrice3;
        
        updateTable();
        button.textContent = 'Editar';

    } else {
        row.querySelectorAll('.view-quantity, .view-price').forEach(span => {
            span.style.display = 'none';
        });
        row.querySelectorAll('.edit-quantity, .edit-price').forEach(input => {
            input.style.display = 'inline-block';
        });
        
        button.textContent = 'Salvar';
    }
}


function removeItem(index) {
    items.splice(index, 1);
    updateTable();
}

function generateBudget() {
    const dateInput = document.getElementById('budgetDate').value;
    if (!dateInput) {
        alert("Por favor, informe a data do orçamento.");
        return;
    }
    const dateParts = dateInput.split('-');
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    budgetDate = new Intl.DateTimeFormat('pt-BR', options).format(date);

    const winnerItems = items.map(item => ({
        quantity: item.quantity,
        description: item.description,
        unitPrice: item.unitPrices.winner,
        totalPrice: item.totalPrices.winner
    }));

    const budget2Items = items.map(item => ({
        quantity: item.quantity,
        description: item.description,
        unitPrice: item.unitPrices.budget2,
        totalPrice: item.totalPrices.budget2
    }));

    const budget3Items = items.map(item => ({
        quantity: item.quantity,
        description: item.description,
        unitPrice: item.unitPrices.budget3,
        totalPrice: item.totalPrices.budget3
    }));

    localStorage.setItem('budgetItems_winner', JSON.stringify(winnerItems));
    localStorage.setItem('budgetItems_2', JSON.stringify(budget2Items));
    localStorage.setItem('budgetItems_3', JSON.stringify(budget3Items));
    localStorage.setItem('budgetDate', budgetDate);

    const winnerPage = document.getElementById('select-page-winner').value;
    const page2 = document.getElementById('select-page-2').value;
    const page3 = document.getElementById('select-page-3').value;

    window.open(`${winnerPage}?budget=winner`, '_blank');
    window.open(`${page2}?budget=2`, '_blank');
    window.open(`${page3}?budget=3`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addItemBtn').addEventListener('click', addItem);
    document.getElementById('generateBudgetBtn').addEventListener('click', generateBudget);
});