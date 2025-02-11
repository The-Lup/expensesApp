const btn = document.getElementById('toggle-form-gasto');
const expeForm = document.getElementById('formulario-gasto');

const openExpeForm = (mode = 'addExpen') => {
  btn.classList.add('agregar-gasto__btn--active');
  expeForm.classList.add('formulario-gasto--active');

  if (mode === 'editExpen') {
    document.querySelector('.formulario-gasto__titulo').innerHTML =
      'Editar Gasto';
    document.querySelector('.formulario-gasto__btn').innerHTML = 'Editar Gasto';
    document.getElementById('formulario-gasto').dataset.mode = 'editExpen';
  } else {
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
    document.querySelector('.formulario-gasto__titulo').innerHTML =
      'Agregar Gasto';
    document.querySelector('.formulario-gasto__btn').innerHTML =
      'Agregar Gasto';
    document.getElementById('formulario-gasto').dataset.mode = 'addExpen';
  }
};

const closeExpeForm = () => {
  btn.classList.remove('agregar-gasto__btn--active');
  expeForm.classList.remove('formulario-gasto--active');
};

btn.addEventListener('click', (e) => {
  if ([...expeForm.classList].includes('formulario-gasto--active')) {
    closeExpeForm();
  } else {
    openExpeForm('addExpen');
  }
});

export { closeExpeForm, openExpeForm };
