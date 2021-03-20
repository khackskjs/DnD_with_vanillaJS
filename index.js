const item = {
    offsetX: 0,
    offsetY: 0,
    isDrag: false,
    itemEl: null,
    movingEl: null,
    calculateMovingCoordinate: function(e) {
        return [e.x - this.offsetX, e.y - this.offsetY];
    }
};

const areaEl = document.getElementsByClassName('area')[0];
item.itemEl = document.getElementsByClassName('item')[0];
bindEventListenerForItem();
bindEventListenerForArea();

function createMovingItem(left, top) {
    const item = document.createElement('div');
    item.classList.add('moving-item');
    moveItem(item, left, top);
    return item;
}

function moveItem(element, x, y) {
    if (!element || !element.style) return;
    element.style.transform = `translate(${x}px, ${y}px)`;
}

function bindEventListenerForItem() {
    item.itemEl.addEventListener('mousedown', function(e) {
        const areaRect = areaEl.getBoundingClientRect();
        
        [item.isDrag, item.offsetX, item.offsetY] = [true, areaRect.left + e.offsetX, areaRect.top + e.offsetY];
        item.itemEl.style['background-color'] = 'skyblue';
        item.itemEl.dataset.selected = true;
        item.movingEl = createMovingItem(...item.calculateMovingCoordinate(e));
        areaEl.append(item.movingEl);
    });
}

function bindEventListenerForArea() {
    areaEl.addEventListener('mouseup', function(e) {
        if (!item.isDrag) return;
    
        areaEl.removeChild(item.itemEl);
    
        [item.itemEl, item.movingEl] = [item.movingEl, null];
        item.itemEl.classList = ['item'];
        bindEventListenerForItem();
        item.isDrag = false;
    });
    
    areaEl.addEventListener('mousemove', function(e) {
        if (!item.isDrag) return;
    
        const [moveX, moveY] = item.calculateMovingCoordinate(e);
        moveItem(item.movingEl, moveX, moveY);
    });
}
