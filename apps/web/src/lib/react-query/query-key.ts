export class QueryKey {
    static fromObject(obj: object) {
        return Object.entries(obj)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${key}:${value}`);
    }
}