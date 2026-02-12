import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { QueryExpensesDto } from './dto/query-expenses.dto';
import { ExpensesService } from './expenses.service';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() dto: CreateExpenseDto) {
    return this.expensesService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryExpensesDto) {
    return this.expensesService.findAll(query);
  }
}
