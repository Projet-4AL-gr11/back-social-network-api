import { ErrorEvent } from '../error.event';

describe('ErrorEvent', () => {
  it('should create an ErrorEvent instance', () => {
    const event = new ErrorEvent('test1', 'error');
    expect(event.localisation).toBe('test1');
    expect(event.error).toBe('error');
    expect(event instanceof ErrorEvent).toBe(true);
  });
});
