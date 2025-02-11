import { v4 as uuidv4 } from 'uuid';
import { closeExpeForm } from './evntBtnExpseForm';
import loadExpens from './loadExpens';
import loadTotalExpense from './loadTotalExpense';

const form = document.querySelector('#formulario-gasto form');
const description = form.descripcion;
const price = form.precio;

const regExDescrip = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ_\- ]{4,30}$/;
const regExPrice = /^\d+(\.\d+)?$/;

const checkDescrip = () => {
  if (!regExDescrip.test(description.value)) {
    description.classList.add('formulario-gasto__input--error');

    form.descripcion.parentElement
      .querySelector('.formulario-gasto__leyenda')
      .classList.add('formulario-gasto__leyenda--active');

    return false;
  } else {
    description.classList.remove('formulario-gasto__input--error');

    form.descripcion.parentElement
      .querySelector('.formulario-gasto__leyenda')
      .classList.remove('formulario-gasto__leyenda--active');
    return true;
  }
};

const checkPrice = () => {
  if (!regExPrice.test(precio.value)) {
    precio.classList.add('formulario-gasto__input--error');

    form.precio.parentElement
      .querySelector('.formulario-gasto__leyenda')
      .classList.add('formulario-gasto__leyenda--active');

    return false;
  } else {
    precio.classList.remove('formulario-gasto__input--error');

    form.precio.parentElement
      .querySelector('.formulario-gasto__leyenda')
      .classList.remove('formulario-gasto__leyenda--active');
    return true;
  }
};

//Event listener to check if description input loses focus
description.addEventListener('blur', (e) => checkDescrip());
//Event Listener to check when the user has an error and type to fix it
description.addEventListener('keyup', (e) => {
  if ([...e.target.classList].includes('formulario-gasto__input--error')) {
    checkDescrip();
  }
});

//Event listener to check if price input loses focus
price.addEventListener('blur', (e) => checkPrice());
//Event Listener to check when the user has an error and type to fix it
price.addEventListener('keyup', (e) => {
  if ([...e.target.classList].includes('formulario-gasto__input--error')) {
    checkPrice();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  //obtaining mode
  const mode = form.closest('#formulario-gasto')?.dataset?.mode;

  //checking fi description and price are correct
  if (checkDescrip() && checkPrice()) {
    const expens = {
      id: uuidv4(),
      date: new Date(),
      description: description.value,
      price: price.value,
    };

    const savedExpens = JSON.parse(window.localStorage.getItem('expenses'));

    if (mode === 'addExpen') {
      //checking if there r any expense
      if (savedExpens) {
        //In case one already exists, we create a new list adding the existing one.
        const newExpenses = [...savedExpens, expens];
        window.localStorage.setItem('expenses', JSON.stringify(newExpenses));
      } else {
        //Adding the first one
        window.localStorage.setItem(
          'expenses',
          JSON.stringify([{ ...expens }])
        );
      }
    } else if (mode === 'editExpen') {
      //obtaining the id of the expense that we wan edit
      const id = document.getElementById('formulario-gasto').dataset?.id;
      //obtaining the data (description/price) from the expense

      //Index of the expense that gonna be edited
      let indexExpEdit;
      if (id && savedExpens) {
        savedExpens.forEach((ex, index) => {
          if (ex.id === id) {
            indexExpEdit = index;
          }
        });
      }

      //we made a copy of the saved expenses to edit
      const newExpense = [...savedExpens];
      newExpense[indexExpEdit] = {
        ...savedExpens[indexExpEdit],
        description: description.value,
        price: price.value,
      };

      //replazing localstorage with the new data
      window.localStorage.setItem('expenses', JSON.stringify(newExpense));
    }

    description.value = '';
    price.value = '';

    loadExpens();
    closeExpeForm();
    loadTotalExpense();
  }
});
