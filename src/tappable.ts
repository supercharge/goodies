'use strict'

import { tap } from '.'

export class Tappable {
  tap<T> (callback?: (value: T) => Promise<any>): Promise<T>
  tap<T> (callback?: (value: T) => any): T
  tap (callback?: (value: any) => any): any {
    return tap(this, callback)
  }
}
