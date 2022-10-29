import { createRenderer } from '@vue/runtime-core';
import { patchProp } from './patchProp';

const { render, createApp } = createRenderer<Panel, Panel>({
    patchProp,
    insert(el, parent): void {
        if (!el || !parent || !el.IsValid() || !parent.IsValid()) {
            return;
        }
        el.SetParent(parent);
    },
    remove(el): void {
        if (!el || !el.IsValid()) {
            return;
        }
        el.DeleteAsync(0);
    },
    createElement(type, _, __, vnodeProps) {
        if (vnodeProps) {
            const { id, ref, ref_key, ref_for, style, ...props } = vnodeProps;
            const el = $.CreatePanelWithProperties(
                type,
                $.GetContextPanel(),
                id,
                props
            );
            return el;
        } else {
            const el = $.CreatePanel(type, $.GetContextPanel(), '');
            return el;
        }
    },
    createText(text) {
        const label = $.CreatePanel('Label', $.GetContextPanel(), '');
        label.text = text;
        return label;
    },
    createComment(text) {
        throw new Error('Not support comment');
    },
    setText(node, text): void {
        if (!node || !node.IsValid()) {
            return;
        }
        if (node.paneltype === 'Label') {
            (node as LabelPanel).text = text;
        }
    },
    setElementText(node, text): void {
        if (!node || !node.IsValid()) {
            return;
        }
        if (node.paneltype === 'Label') {
            (node as LabelPanel).text = text;
        }
    },
    parentNode(node) {
        if (!node || !node.IsValid()) {
            return null;
        }
        return node.GetParent();
    },
    nextSibling(node) {
        if (!node || !node.IsValid()) {
            return null;
        }
        const parent = node.GetParent();
        if (parent && parent.IsValid()) {
            return parent.GetChild(parent.GetChildIndex(node) + 1);
        }
        return null;
    },
    querySelector(selector) {
        return $(selector);
    },
    setScopeId(el, id): void {
        if (!el || !el.IsValid()) {
            return;
        }
        el.AddClass(id);
    }
});

// `render` 是底层 API
// `createApp` 返回一个应用实例
export { render, createApp };

// 重新导出 Vue 的核心 API
export * from '@vue/runtime-core';
