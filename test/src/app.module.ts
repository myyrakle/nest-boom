import { TestsModule } from './tests/tests.module'
import { FireBallsModule } from './fire-balls/fire-balls.module'
import { FiresModule } from "./fires/fires.module";
import { Module } from "@nestjs/common";
import { PostController } from "./post/post.controller";
import { AuthUser } from "./provider/auth_user.provider";
import { databaseProviders } from "./provider/database.provider";
import { Mybatis } from "./provider/mybatis.provider";
import { PostService } from "./post/post.service";
import { PostModule } from "./post/post.module";
import { PostCommentModule } from "./post-comment.ts/post-comment.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserService } from "./user/user.service";
import { RefreshTokenService } from "./refresh-tokens/refresh-token.service";
import { UserRepository } from "./user/user.repository";
import { RefreshTokenRepository } from "./refresh-tokens/refresh-token.repository";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [TestsModule, PostModule, PostCommentModule, AuthModule, UserModule],
    controllers: [AppController],
    providers: [FireBallsModule, 
        FiresModule,
        AppService,
        AuthUser,
        Mybatis,
        ...databaseProviders,
    ],
})
export class AppModule {}
