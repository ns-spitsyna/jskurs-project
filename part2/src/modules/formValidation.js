const formValidation = (elem) => {
    let valueElement = document.querySelector(elem);
    valueElement.addEventListener('input', () => {
        valueElement.value = valueElement.value.replace(/\D/g, '');
    });
};

export default formValidation;