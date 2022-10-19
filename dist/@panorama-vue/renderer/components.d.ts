/// <reference types="@moddota/panorama-types" />
declare global {
    type Booleanish = boolean | 'true' | 'false';
    type Numberish = number | string;

    interface PanoramaElementBaseAttribites {
        id?: string;
        class?: string;
        style?: VCSSStyleDeclaration;
        hittestchildren?: Booleanish;
        hittest?: Booleanish;
    }

    type PanoramaElementAttribites<T = {}> = T & PanoramaElementBaseAttribites;
}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        Panel: DefineComponent<PanoramaElementAttribites<{}>>;
        Button: DefineComponent<PanoramaElementAttribites<{}>>;
        Label: DefineComponent<
            PanoramaElementAttribites<{ text?: string; html?: Booleanish }>
        >;
        Image: DefineComponent<
            PanoramaElementAttribites<{
                src?: string;
                scaling?: ScalingFunction;
            }>
        >;
        ToggleButton: DefineComponent<
            PanoramaElementAttribites<{ text?: string; selected?: Booleanish }>
        >;
        RadioButton: DefineComponent<
            PanoramaElementAttribites<{
                text?: string;
                group?: string;
                selected?: Booleanish;
            }>
        >;
        TextEntry: DefineComponent<
            PanoramaElementAttribites<{
                text?: string;
                maxchars?: Numberish;
                placeholder?: string;
                textmode?: 'normal' | 'password';
            }>
        >;
        Slider: DefineComponent<
            PanoramaElementAttribites<{
                direction?: 'horizontal' | 'vertical';
            }>
        >;
        DOTAUserName: DefineComponent<
            PanoramaElementAttribites<{
                steamid?: string;
                accountid?: string;
            }>
        >;
        DOTAAvatarImage: DefineComponent<
            PanoramaElementAttribites<{
                steamid?: string;
                accountid?: string;
                nocompendiumborder?: Booleanish;
                lazy?: Booleanish;
            }>
        >;
        DOTAAbilityImage: DefineComponent<
            PanoramaElementAttribites<{
                abilityname?: string;
            }>
        >;
        DOTAItemImage: DefineComponent<
            PanoramaElementAttribites<{
                itemname?: string;
            }>
        >;
        DOTAPortrait: DefineComponent<PanoramaElementAttribites<{}>>;
        DOTAScenePanel: DefineComponent<
            PanoramaElementAttribites<{
                camera?: string;
                map?: string;
                light?: string;
                renderdeferred?: Booleanish;
                particleonly?: Booleanish;
                antialias?: Booleanish;
                rotateonhover?: Booleanish;
                yawmin?: Numberish;
                yawmax?: Numberish;
                pitchmin?: Numberish;
                pitchmax?: Numberish;
                acceleration?: Numberish;
                panoramasurfacexml?: string;
                panoramasurfacewidth?: Numberish;
                panoramasurfaceheight?: Numberish;
                unit?: string;
                allowrotation?: Booleanish;
                drawbackground?: Booleanish;
                'activity-modifier'?: string;
                rendershadows?: Booleanish;
                renderwaterreflections?: Booleanish;
                environment?: string;
            }>
        >;
    }
}

export {};
