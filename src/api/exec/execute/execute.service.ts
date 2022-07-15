import { Injectable } from "@nestjs/common";
import { ExecuteDto } from './domain/dto/execute.dto';
import Axios  from "axios";

@Injectable()
export class ExecuteService {

  constructor() {
  }

  async create(createExecuteDto: ExecuteDto) {
    return '';
  }

  async findAll() {
    let response;

    try {
      response = await Axios.get(
        process.env.EXEC_CODE_URL + '/api/code',
      ).then(function (response) {
        return response.data;
      });
    } catch (er) {
      console.log(er);
    }
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} execute`;
  }

  update(id: number, updateExecuteDto: ExecuteDto) {
    return `This action updates a #${id} execute`;
  }

  remove(id: number) {
    return `This action removes a #${id} execute`;
  }
}
