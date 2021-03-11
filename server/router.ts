import { BaseRouter } from './core/base.router';
import { UserRouter } from './user/user.router';

export class RootRouter extends BaseRouter {
  protected async didInit() {
    this.router.use('/user', await UserRouter.getRouter());
  }
}
