/// <reference types="@moddota/panorama-types" />

import { App, Component } from '@vue/runtime-core';

declare const render: import('@vue/runtime-core').RootRenderFunction<Panel>,
    createApp: import('@vue/runtime-core').CreateAppFunction<Panel>;

declare function renderPanel(
    rootPanel: Panel,
    rootComponent: Component
): App<Panel>;

export { render, createApp, renderPanel };
export * from '@vue/runtime-core';
