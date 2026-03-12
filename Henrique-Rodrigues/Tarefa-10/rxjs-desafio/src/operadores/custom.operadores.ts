import { Observable, tap } from 'rxjs';
import type { OperatorFunction } from 'rxjs';

export function logComTimeStamp<T>(label?: string): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap(value => {
        const horario = new Date().toISOString();
        const prefixo = label ? `[${label}]` : '[LOG]';
        console.log(`${prefixo} ${horario}`, value);
      })
    );
}