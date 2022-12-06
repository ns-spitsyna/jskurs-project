const scrollDown = (blockId) => {
    const scrollBlockId = blockId.getAttribute('href');
        const scrollBlock = document.querySelector(scrollBlockId).getBoundingClientRect();
        window.scroll({left: scrollBlock.left, top: scrollBlock.top, behavior: 'smooth'});
};

export default scrollDown;