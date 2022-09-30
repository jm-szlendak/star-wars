import { Test, TestingModule } from '@nestjs/testing';
import { ResponseTransformer } from './response.transformer';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { cold } from 'jest-marbles';

describe('ResponseTransformerInterceptor', () => {
  let interceptor: ResponseTransformer<string>;
  const context = {} as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseTransformer],
    }).compile();

    interceptor = module.get<ResponseTransformer<string>>(
      ResponseTransformer
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should map response', () => {
    const values = { a: 'test', b: { data: 'test' } };
    const next = {} as CallHandler;
    next.handle = jest.fn(() => cold('a', values));
    const expected = cold('b', values);

    const result = interceptor.intercept(context, next);

    expect(result).toBeObservable(expected);
  });

});
