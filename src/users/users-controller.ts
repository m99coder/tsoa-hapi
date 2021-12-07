import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Response,
  Route,
  SuccessResponse,
} from '@tsoa/runtime'
import { User } from './users'
import { UserCreationParams, UsersService } from './users-service'

interface ValidateErrorJSON {
  message: 'Validation failed'
  details: { [name: string]: unknown }
}

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Query() name?: string,
  ): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @Response<ValidateErrorJSON>(422, 'Validation failed') // Reflected in OpenAPI spec
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
  ): Promise<User> {
    this.setStatus(201)
    return new UsersService().create(requestBody)
  }
}
