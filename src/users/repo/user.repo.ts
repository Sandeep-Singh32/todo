// // import { EntityRepository } from "typeorm";

// import { Injectable } from '@nestjs/common';
// import { DataSource, Repository } from 'typeorm';
// import { User } from '../entities/user.entity';

// // @EntityRepository()
// @Injectable()
// export class UserRepository extends Repository<User> {
//   constructor(private dataSource: DataSource) {
//     super(User, dataSource.createEntityManager());
//   }

//   async createUser(id: string) {
//     return this.findOne({ where: { id } });
//   }
// }
