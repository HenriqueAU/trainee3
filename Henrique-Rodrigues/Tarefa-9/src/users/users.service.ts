import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    const users = await this.userRepository.findOne({ where: { id } });
    if (users) {
      return users;
    }
    throw new NotFoundException(`User with ${id} not found`);
  }

  async create(createUserDTO: CreateUserDTO): Promise<Users> {
    const user = this.userRepository.create(createUserDTO);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<Users> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDTO,
    });
    if (user) {
      return this.userRepository.save(user);
    }
    throw new NotFoundException(`User with ${id} not found`);
  }

  async remove(id: number): Promise<void> {
    const users = await this.userRepository.findOneBy({ id });
    if (users) {
      await this.userRepository.remove(users);
    }
    throw new NotFoundException(`User ${id} not found`);
  }
}
