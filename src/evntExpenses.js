import { openExpeForm } from './evntBtnExpseForm';
import loadExpens from './loadExpens';
import loadTotalExpense from './loadTotalExpense';

const expContainer = document.getElementById('gastos');

expContainer.addEventListener('click', (e) => {
  const expen = e.target.closest('.gasto');

  //Checking if we do click on the right spot.
  if (expen.scrollLeft > 0) {
    expen.querySelector('.gasto__info').scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  } else {
    expen.querySelector('.gasto__acciones').scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  }

  //Edit expense option
  if (e.target.closest('[data-accion="editar-gasto"]')) {
    //Get the ID of the saved expenses.
    const id = expen.dataset.id;

    //Retrieving the saved expenses from localstorage.
    const savedExpenses = JSON.parse(window.localStorage.getItem('expenses'));

    let qty = '';
    let desc = '';

    //Checking if there are saved queries
    if (savedExpenses && savedExpenses.length > 0) {
      savedExpenses.forEach((xpen) => {
        if (xpen.id === id) {
          qty = xpen.price;
          desc = xpen.description;
        }
      });

      //We set the inputs with the price and description data from the form.
      document.querySelector('#formulario-gasto #descripcion').value = desc;
      document.querySelector('#formulario-gasto #precio').value = qty;
      document.querySelector('#formulario-gasto').dataset.id = id;

      openExpeForm('editExpen');
    }
  }

  //Delete expense option
  if (e.target.closest('[data-accion="eliminar-gasto"]')) {
    //Obtaining the id of the expense that we want delete
    const id = e.target.closest('.gasto').dataset.id;

    //obtaining the saved expensse
    const expensesSaved = JSON.parse(window.localStorage.getItem('expenses'));

    if (expensesSaved) {
      const nExpenses = expensesSaved.filter((xpenses) => {
        if (xpenses.id !== id) {
          return xpenses;
        }
      });

      window.localStorage.setItem('expenses', JSON.stringify(nExpenses));
    }

    loadExpens();
    loadTotalExpense();
  }
});
