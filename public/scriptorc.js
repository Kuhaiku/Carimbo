document.addEventListener('DOMContentLoaded', () => {
    // Função para buscar o parâmetro 'budget' na URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Recupera o tipo de orçamento (winner, 2 ou 3)
    const budgetType = getUrlParameter('budget');

    // Recupera os itens do localStorage com base no tipo de orçamento
    const items = JSON.parse(localStorage.getItem(`budgetItems_${budgetType}`)) || [];
    const budgetDate = localStorage.getItem('budgetDate');

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

    // Atualiza o valor total e a data na página
    const totalValueElement = document.getElementById('totalValue');
    if (totalValueElement) {
        totalValueElement.textContent = `R$ ${totalValue.toFixed(2).replace('.',",")}`;
    }

    const formattedDateElement = document.getElementById('formattedDate');
    if (budgetDate && formattedDateElement) {
        formattedDateElement.textContent = budgetDate;
    }
});