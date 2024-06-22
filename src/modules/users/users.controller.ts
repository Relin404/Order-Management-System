import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/modules/users/dtos/update-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, description: 'Users found' })
  @ApiOperation({ summary: 'Public' })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Orders history found' })
  @ApiNotFoundResponse({ description: 'Orders history not found' })
  @ApiOperation({ summary: 'Public' })
  @Get(':userId/orders')
  async getUserOrdersHistory(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getUserOrdersHistory(userId);
  }

  @ApiResponse({ status: 200, description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'Public' })
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneById(id);
  }

  @ApiBody({ type: UpdateUserDto, description: 'User data' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }
}
