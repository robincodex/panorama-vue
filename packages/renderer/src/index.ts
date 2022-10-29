import { App, Component, createRenderer } from '@vue/runtime-core';
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
                id || '',
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
        if (text[0] === '#') {
            label.text = $.Localize(text);
        } else {
            label.text = text;
        }
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

declare global {
    interface Panel {
        __vue_app__?: App<Panel>;
    }
}

/**
 * 渲染到PUI的Panel，如果重载了会进行unmount操作，然后删除掉rootPanel下所有的元素，全部重新渲染一遍。
 */
function renderPanel(
    rootPanel: Panel,
    rootComponent: Component,
    onCreatedApp?: (app: App<Panel>) => void
) {
    if (rootPanel.__vue_app__) {
        rootPanel.__vue_app__.unmount();
        rootPanel.RemoveAndDeleteChildren();
        delete rootPanel.__vue_app__;
    }
    const app = createApp(rootComponent);
    if (onCreatedApp) {
        onCreatedApp(app);
    }
    app.mount(rootPanel);
    return app;
}

// `render` 是底层 API
// `createApp` 返回一个应用实例
export { render, createApp, renderPanel };

// 重新导出 Vue 的核心 API
export * from '@vue/runtime-core';
