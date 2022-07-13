import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!isEmail(value)){
      throw new BadRequestException('incorrect email');
    }
    return value;
  }
}
