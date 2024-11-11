export function isPointInRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export function cleanPhone(phone) {
    return phone?.replace(/[^0-9+]/g, '');
}

export function busyProcess(busy, setBusy, process) {
    if (busy) {
        return;
    }

    setBusy(true);
    process().finally(() => setBusy(false));
}