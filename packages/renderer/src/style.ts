type Style = Record<string, string> | null;

export function patchStyle(el: Panel, prev: Style, next: Style) {
    if (typeof prev === 'string' || typeof next === 'string') {
        throw new Error('The style property does not support string');
    }
    if (next) {
        for (const key in prev) {
            if (next[key] == null) {
                setStyle(el, key, '');
            }
        }
        for (const key in next) {
            setStyle(el, key, next[key]);
        }
    } else {
        for (const key in prev) {
            setStyle(el, key, '');
        }
    }
}

function setStyle(el: Panel, name: string, val: string) {
    if (Array.isArray(val)) {
        val.forEach(v => setStyle(el, name, v));
    } else {
        // @ts-ignore
        el.style[name] = val;
    }
}
