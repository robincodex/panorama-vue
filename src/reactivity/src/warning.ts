export function warn(msg: string, ...args: any[]) {
    $.Msg(`[Vue warn] ${msg}`, ...args);
}
