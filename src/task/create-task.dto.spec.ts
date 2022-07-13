import { Status } from './task.interface';
import { plaintToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

describe('create-task.dto', () => {
  let dto;
  beforeAll(() => {
    dto = {
      task: '',
      tags: [],
      status: '',
    }
  });

  it('task is empty', async () => {
    const ofImportDto = plaintToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map(err => err.property).includes('task')).toBeTruthy();
  });
  it('task is not empty', async () => {
    dto.task = 'something task';

    const ofImportDto = plaintToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map(err => err.property).includes('task')).toBeFalsy();
  });

  it('tags is empty', async () => {
    const ofImportDto = plaintToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map(err => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).toBe(0);
  });
  it('each element of tags is string', async () => {
    dto.tags = ['something tags', 1];

    const ofImportDto = plaintToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map(err => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).not.toBe(0);
    expect(dto.tags.every(el => typeof el === 'string')).not.toBeTruthy();
  });

  it('each element of tags is string and array is not empty', async () => {
    dto.tags = ['something tags', '1'];

    const ofImportDto = plaintToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map(err => err.property).includes('tags')).toBeFalsy();
  });

  it('type of status is not enum Status', async () => {
    dto.status = 'status';

    const ofImportDto = plaintToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map(err => err.property).includes('status')).toBeTruthy();
  });

  it('type of status is enum Status', async () => {
    dto.status = Status.ERROR;
    const ofImportDto = plaintToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map(err => err.property).includes('status')).toBeFalsy();
    expect(dto.status).toBe('error');
  });
});