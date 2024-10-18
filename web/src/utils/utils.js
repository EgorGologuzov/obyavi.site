export function isXYInRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export function useIdRef() {
    const id = "ref" + Math.random() * 100000000000000000;
    return { id: id, getElement() { return document.getElementById(id); } };
}