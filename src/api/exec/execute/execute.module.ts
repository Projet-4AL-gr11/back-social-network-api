import { HttpModule, Module } from "@nestjs/common";
import { ExecuteService } from './execute.service';
import { ExecuteController } from './execute.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    })
  ],
  controllers: [ExecuteController],
  providers: [ExecuteService]
})
export class ExecuteModule {}
