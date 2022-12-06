const togglePhoto = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach(item => {
        item.addEventListener('mouseover', event => event.target.src = event.target.dataset.img);
        item.addEventListener('mouseout', event =>  event.target.src = item.src);
    });
};

export default togglePhoto;