import { ErrorsEvent } from '../errorsEvent';

describe('ErrorEvent', () => {
  it('should create an ErrorEvent instance', () => {
    const event = new ErrorsEvent('test1', 'error');
    expect(event.localisation).toBe('test1');
    expect(event.error).toBe('error');
    expect(event instanceof ErrorsEvent).toBe(true);
  });
});
