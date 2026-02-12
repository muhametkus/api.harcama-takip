import { Transform } from 'class-transformer';

export function ToDecimalString(): PropertyDecorator {
  return Transform((params: { value: unknown }) => {
    const { value } = params;

    if (typeof value === 'number') {
      return value.toString();
    }

    return value;
  });
}
