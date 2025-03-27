
// Recupera os itens do localStorage
const items = JSON.parse(localStorage.getItem('budgetItems')) || [];

// Calcula o valor total
let totalValue = 0;

// Adiciona os itens à tabela e calcula o total
const tableBody = document.getElementById('itemsTableBody');
items.forEach(item => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${item.quantity}</td>
        <td>${item.description}</td>
        <td>R$ ${item.unitPrice.toFixed(2).replace('.',",")}</td>
        <td>R$ ${item.totalPrice.toFixed(2).replace('.',",")}</td>
    `;
    tableBody.appendChild(newRow);
    totalValue += item.totalPrice; // Soma o valor total
});


// Atualiza o valor total na página
document.getElementById('totalValue').textContent = `R$ ${totalValue.toFixed(2).replace('.',",")}`;
