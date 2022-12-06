import scrollDown from './scrollDown';

const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        body = document.body;

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

    body.addEventListener('click', (event) => {
        let target = event.target;
        if(target.closest('.menu') || target.closest('.close-btn')) {
            handlerMenu();
        } else if(target.closest('menu ul>li')) {
            handlerMenu();
            event.preventDefault();
            scrollDown(event.target);
        } else {
            target = target.closest('menu');
            if(!target){
                menu.classList.remove('active-menu');
            }
        }
    });
};

export default toggleMenu;