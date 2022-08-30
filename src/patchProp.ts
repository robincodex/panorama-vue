import { RendererOptions } from '@vue/runtime-core';
import { patchStyle } from './style';

const onRE = /^on[^a-z]/;
export const isOn = (key: string) => onRE.test(key);

export const isModelListener = (key: string) => key.startsWith('onUpdate:');

export const patchProp: RendererOptions<Panel, Panel>['patchProp'] = function (
    el,
    key,
    prevValue,
    nextValue,
    isSVG,
    prevChildren,
    parentComponent,
    parentSuspense,
    unmountChildren
) {
    if (key === 'class') {
        patchClass(el, prevValue, nextValue);
    } else if (key === 'style') {
        patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
        if (!isModelListener(key)) {
            patchEvent(el, key, nextValue);
        }
    } else if (key[0] === '.' || key[0] === '^') {
        throw new Error('Panorama not support change property');
    } else {
        if (typeof nextValue === 'string') {
            el.SetAttributeString(key, nextValue);
        } else if (typeof nextValue === 'number') {
            el.SetAttributeInt(key, nextValue);
        }
    }
};

/** 修改class样式 */
function patchClass(
    el: Panel,
    prevValue: string | null | undefined,
    nextValue: string | null | undefined
): void {
    if (prevValue && !nextValue) {
        const prevList = prevValue.split(' ');
        for (const v of prevList) {
            el.RemoveClass(v);
        }
        return;
    }
    if (!prevValue) {
        prevValue = '';
    }
    if (!nextValue) {
        nextValue = '';
    }
    const prevList = prevValue.split(' ');
    const nextList = nextValue.split(' ');
    for (const v of prevList) {
        if (!nextList.includes(v)) {
            el.RemoveClass(v);
        }
    }
    for (const v of nextList) {
        el.AddClass(v);
    }
}

export function patchEvent(
    el: Panel,
    event: string,
    nextValue: Function | null
) {
    event = event.toLowerCase();
    if (nextValue) {
        el.SetPanelEvent(event as PanelEvent, nextValue as () => void);
    } else {
        el.ClearPanelEvent(event as PanelEvent);
    }
}
