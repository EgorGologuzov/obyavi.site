export function isPointInRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export function cleanPhone(phone) {
    return phone?.replace(/[^0-9+]/g, '');
}

export function formatPhone(phone){
    return `${phone.slice(0,2)} (${phone.slice(2,5)}) ${phone.slice(5,8)} ${phone.slice(8,10)}-${phone.slice(10,phone.length)}`
}

export function busyProcess(busy, setBusy, process) {
    if (busy) {
        return;
    }

    setBusy(true);
    process().finally(() => setBusy(false));
}