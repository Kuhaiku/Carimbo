const items = [];
let budgetDate = '';

function addItem() {
    const quantity = parseFloat(document.getElementById('quantity').value);
    const description = document.getElementById('description').value;
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);

    if (isNaN(quantity) || quantity <= 0 || isNaN(unitPrice) || unitPrice <= 0 || description.trim() === "") {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const totalPrice = quantity * unitPrice;

    // Adiciona item ao array
    const item = { quantity, description, unitPrice, totalPrice };
    items.push(item);

    // Atualiza a tabela
    updateTable();

    // Limpa os campos
    document.getElementById('quantity').value = '';
    document.getElementById('description').value = '';
    document.getElementById('unitPrice').value = '';
}

function updateTable() {
    const tableBody = document.getElementById('itemsTable').querySelector('tbody');
    tableBody.innerHTML = '';

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    items.forEach((item, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>
                <span id="unitPrice-${index}">${formatter.format(item.unitPrice)}</span>
                <input 
                    id="editUnitPrice-${index}" 
                    type="number" 
                    value="${item.unitPrice}" 
                    style="display: none; width: 80px;"
                />
                <button onclick="editItem(${index})">Editar</button>
            </td>
            <td id="totalPrice-${index}">${formatter.format(item.totalPrice)}</td>
            <td><button class="btn" onclick="removeItem(${index})">Remover</button></td>
        `;
        tableBody.appendChild(newRow);
    });
}

function editItem(index) {
    const priceSpan = document.getElementById(`unitPrice-${index}`);
    const priceInput = document.getElementById(`editUnitPrice-${index}`);

    if (priceSpan.style.display === 'none') {
        // Atualiza o valor e recalcula o total
        const newPrice = parseFloat(priceInput.value);
        if (isNaN(newPrice) || newPrice <= 0) {
            alert("Por favor, insira um valor válido.");
            return;
        }
        items[index].unitPrice = newPrice;
        items[index].totalPrice = items[index].quantity * newPrice;

        // Atualiza a tabela
        updateTable();
    } else {
        // Mostra o campo de edição
        priceSpan.style.display = 'none';
        priceInput.style.display = 'inline-block';
        priceInput.focus();
    }
}

function removeItem(index) {
    // Remove o item pelo índice
    items.splice(index, 1);
    updateTable();
}

// function generateBudget() {
//     // Obtém a data do orçamento
//     const dateInput = document.getElementById('budgetDate').value;
//     if (!dateInput) {
//         alert("Por favor, informe a data do orçamento.");
//         return;
//     }

//     // Formata a data no padrão "4 de dezembro de 2024"
//     const date = new Date(dateInput);
//     const options = { day: 'numeric', month: 'long', year: 'numeric' };
//     budgetDate = new Intl.DateTimeFormat('pt-BR', options).format(date);

//     // Salva os itens e a data no localStorage
//     localStorage.setItem('budgetItems', JSON.stringify(items));
//     localStorage.setItem('budgetDate', budgetDate);

//     // Obtém a página selecionada no momento
//     const pagina = document.getElementById('select-page').value;

//     // Abre a página do orçamento
//     window.open(pagina, '_blank');
// }
function generateBudget() {
    // Obtém a data do orçamento
    const dateInput = document.getElementById('budgetDate').value;
    if (!dateInput) {
        alert("Por favor, informe a data do orçamento.");
        return;
    }

    // Corrige a data para o fuso horário local
    const dateParts = dateInput.split('-'); // Divide o formato ISO em [ano, mês, dia]
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Mês é indexado em 0

    // Formata a data no padrão "4 de dezembro de 2024"
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    budgetDate = new Intl.DateTimeFormat('pt-BR', options).format(date);

    // Salva os itens e a data no localStorage
    localStorage.setItem('budgetItems', JSON.stringify(items));
    localStorage.setItem('budgetDate', budgetDate);

    // Obtém a página selecionada no momento
    const pagina = document.getElementById('select-page').value;

    // Abre a página do orçamento
    window.open(pagina, '_blank');
}
