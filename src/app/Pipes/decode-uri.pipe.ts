import { Pipe, PipeTransform } from '@angular/core';
import { decode } from 'html-entities';

@Pipe({
  name: 'decodeUri',
})
export class DecodeUriPipe implements PipeTransform {
  // Function to transform the encoded values to the decoded format
  transform(value: string): string {
    return decode(value);
  }
}
