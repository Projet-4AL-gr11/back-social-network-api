import { HttpService, Injectable } from "@nestjs/common";
import { ExecuteDto } from './domain/dto/execute.dto';
import Axios from "axios";
// import { Execute } from "./domain/entities/execute.entity";

@Injectable()
export class ExecuteService {

  constructor(private readonly httpService: HttpService) {
  }

  async create(createExecuteDto: ExecuteDto){
    console.log(process.env.EXEC_CODE_URL+ '/api/code/');
    let response;
    let result;
    try {
      response = await Axios.post(
        process.env.EXEC_CODE_URL + '/api/code/', createExecuteDto
      ).then(function (response) {
        return response;
      });
    } catch (er) {
      result = {
        status: response.status,
        error: er,
        execution: null
      }
      return result;
    }
    result = {
      status: response.status,
      error: null,
      execution: response.data
    }
    return result;
  }

   async findAll(){
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
    return await response;
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
