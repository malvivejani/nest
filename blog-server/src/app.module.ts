import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './db_connection/pg.config';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { PostCommentModule } from './post-comment/post-comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    PostModule,
    PostCommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
