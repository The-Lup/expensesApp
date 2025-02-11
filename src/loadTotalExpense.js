import isThisMonth from 'date-fns/isThisMonth';
import parseISO from 'date-fns/parseISO';

const loadTotalExpense = () => {
  const amountContainer = document.getElementById('total-gastado');
  const expses = JSON.parse(window.localStorage.getItem('expenses'));
  let total = 0;

  if (expses) {
    const monthExpses = expses.filter((expses) => {
      if (isThisMonth(parseISO(expses.date))) {
        return expses;
      }
    });

    if (monthExpses) {
      monthExpses.forEach((expense) => {
        total += parseFloat(expense.price);
      });
    }

    //adding cash formar to the total
    const formatCoin = new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    });
    amountContainer.innerText = formatCoin.format(total);
  }
};

export default loadTotalExpense;
