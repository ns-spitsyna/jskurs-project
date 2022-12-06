const sendForm = (formId) => {
    const errorMessage = 'Что-то пошло не так ...',
        loadMessage = 'Загрузка...',
        successMessage ='Спасибо! Мы скоро с вами свяжемся!',
        form = document.getElementById(formId);

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white';

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            let body = {};
            formData.forEach((value, key) => {
                if(value !== '') {
                    body[key] = value;
                }
            });

            if(Object.keys(body).length !== 0) {
                postData(body)
                    .then((response) => {
                        if(response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        statusMessage.textContent = successMessage;
                        form.reset();
                    })
                    .catch(error => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
            }
        });

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        }
};

export default sendForm;