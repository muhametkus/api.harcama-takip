import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateAssetDto) {
    return this.assetsService.create(dto);
  }
}
