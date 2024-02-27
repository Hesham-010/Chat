import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  public updateProvidedFields<T>(model: T, input: object): T {
    Object.keys(input).map((field) => (model[field] = input[field]));
    return model;
  }

  // public async getFileName(file: Upload | string) {
  //   if (typeof file === 'string') return file;

  //   const { filename } = await file;
  //   return filename;
  // }

  // upperCaseFirstLetter(str: string) {
  //   return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  // }

  public trimAllSpaces(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }
}
