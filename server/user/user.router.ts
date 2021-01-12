import { BaseRouter } from '@core/base.router';
import { UserService } from './user.service';
import { inject } from '@core/base.module';
import passport from 'passport';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51HGUvrDOqWcprKpuZu6vskBRg0M6PNsdvQMN0LUyIOuZi97hyNjmLyWfuKgDxiG6s3YKdgaM1a5G70KqIM1Txwpa00OWsn7Ja1',
  {
    apiVersion: '2020-08-27',
  },
);
export class UserRouter extends BaseRouter {
  service = inject(UserService);
  registerRoutes() {
    this.router.post('/upload', (req: any, res) => {
      if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      console.log(req);
      this.saveFileInfo.bind(this);
      const file = req.files.file;
      file.mv(`${__dirname}/../../public/uploads/${file.name}`, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ filePath: `/uploads/${file.name}`, status: 'success' });
      });
    });
    this.router.post('/signup', this.signupUser.bind(this));
    this.router.post(
      '/login',
        function(req, res, next) {
          passport.authenticate('local', function(err, user, info) {
            if (err) { return res.json('error');; }
            if (!user) { return res.json('error');; }
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              res.json('success');
            });
          })(req, res, next);
        }
    );
    this.router.get('/isauthenticated', this.checkAuthenticated.bind(this));
    this.router.get('/logout', function (req, res) {
      req.logout();
      res.json('success');
    });
    this.router.get('/get-user-information', this.getUserInformation.bind(this));
  }

  async signupUser(req, res) {
    const { name, birthday, signInAs, email, password, grade, subject, telephone } = req.body;
    await this.service.saveUser({
      name,
      birthday,
      signInAs,
      email,
      password,
      grade,
      subject,
      telephone,
    });
    res.json({ msg: 'Sign Up Success!', status: 'success' });
  }
  async saveFileInfo(req, res) {
    const data =  [1003, 'designPatterns.docx', 'translated', 1005] ;
    await this.service.saveFileInfo(data);
  }
  async checkAuthenticated(req, res) {
    if (req.isAuthenticated()) {
      return res.json({ session: true });
    }
    return res.json({ session: false });
  }
  async getUserInformation(req, res) {
    return res.json(await this.service.getUserInformation(req.session.passport.user));
  }

}
