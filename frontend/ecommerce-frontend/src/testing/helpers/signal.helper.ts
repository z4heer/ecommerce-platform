import {
    Signal,
    WritableSignal,
    signal
} from '@angular/core';

export function createSignal<T>(
    initialValue: T
): WritableSignal<T> {
    return signal(initialValue);
}

export function createReadonlySignal<T>(
    initialValue: T
): Signal<T> {
    return signal(initialValue).asReadonly();
}

export function updateSignal<T>(
    target: WritableSignal<T>,
    value: T
): void {
    target.set(value);
}