import { computed as _computed } from '@panorama-vue/reactivity';

export const computed = ((getterOrOptions: any, debugOptions?: any) => {
    // @ts-ignore
    return _computed(getterOrOptions, debugOptions);
}) as typeof _computed;
