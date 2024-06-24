import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/modules/users/dtos/update-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Find all users', operationId: 'findAll' })
  @ApiResponse({ status: 200, description: 'Users found' })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get user orders history',
    operationId: 'getUserOrdersHistory',
  })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Orders history found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':userId/orders')
  async getUserOrdersHistory(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getUserOrdersHistory(userId);
  }

  @ApiOperation({ summary: 'Get user by ID', operationId: 'getUser' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update user', operationId: 'updateUser' })
  @ApiParam({ name: 'id', type: 'number' })
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

  @ApiOperation({ summary: 'Delete user', operationId: 'deleteUser' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }
}
