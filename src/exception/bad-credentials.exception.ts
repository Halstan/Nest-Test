import { HttpException, HttpStatus } from '@nestjs/common';

export class BadCredentiasException extends HttpException {
  /**
   * Instantiate an `BadCredentialsException` Exception.
   *
   * @example
   * `throw new BadCredentialsException`
   */

  constructor() {
    super('Bad Credentials', HttpStatus.FORBIDDEN);
  }
}
