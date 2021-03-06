'use strict';
const strapi = require('strapi');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keySecret = 'sk_test_qW0aKp0KALolr630jnlWegdi';
const stripe = require('stripe')(keySecret);
/**
 * A set of functions called "actions" for `User`
 */

module.exports = {
  profile: async (ctx, ) => {
    ctx.send({ user: ctx.state.user });
  },
  allStylist: async (ctx) => {
    return strapi.plugins['users-permissions'].models.user.find({ role: '5bfe57026d852426c8d11d0a' }).then(stylist => {
      return ctx.send({ stylist });
    }).catch(error => {
      return ctx.badRequest(error);
    });
  },
  mediaprod: async (ctx) => {
    return Mediaproduction.create(ctx.request.body).then(media => {
      const token = crypto.randomBytes(10).toString('hex');
      return Token.create({ token, unconfirm_id: media._id }).then((data) => {
        if (!data) {
          return ctx.send(data);
        }
        return strapi.plugins.email.services.email.send({
          from: ctx.request.body.email,
          to: ctx.request.body.email,
          html: `<a href=\`http://localhost:1337/mediaprodconfirm?token=${token}\`>Are you sure?</a>`,
          text: 'Mediaproduction confirm'
        })
          .then(() => {
            return ctx.send('Check your email');
          })
          .catch((err) => {
            return ctx.badRequest(err);
          });
      });
    }).catch(err => {
      return ctx.send(err);
    });

  },
  mediaprodconfirm: async (ctx) => {
    const { token } = ctx.query;
    return Token.findOne({ token: token }).then(data => {
      if (!data) {
        return ctx.badRequest('Invalid Token');
      }
      return Mediaproduction.findOne({ _id: data.unconfirm_id }).then(media => {
        media.confirmed = true;
        media.save();
        data.remove();
        return ctx.send('Media confirmed');
      }).catch(error => {
        return ctx.send(error);
      });
    });

  },
  wedding: async (ctx) => {
    return Wedding.create(ctx.request.body).then(wedding => {
      const token = crypto.randomBytes(10).toString('hex');
      return Token.create({ token, unconfirm_id: wedding._id }).then((data) => {
        if (!data) {
          return ctx.send(data);
        }
        return strapi.plugins.email.services.email.send({
          from: ctx.request.body.email,
          to: ctx.request.body.email,
          html: `<a href=\`http://localhost:1337/weddingconfirm?token=${token}\`>Are you sure?</a>`,
          text: 'Wedding confirm'
        })
          .then(() => {
            return ctx.send('Check your email');
          })
          .catch((err) => {
            return ctx.badRequest(err);
          });
      });
    }).catch(err => {
      return ctx.send(err);
    });

  },
  weddingconfirm: async (ctx) => {
    const { token } = ctx.query;
    return Token.findOne({ token: token }).then(data => {
      if (!data) {
        return ctx.badRequest('Invalid Token');
      }
      return Wedding.findOne({ _id: data.unconfirm_id }).then(wedding => {
        wedding.confirmed = true;
        wedding.save();
        data.remove();
        return ctx.send('Wedding confirmed');
      }).catch(error => {
        return ctx.send(error);
      });
    });
  },
  changepassword: async (ctx) => {
    const token = crypto.randomBytes(10).toString('hex');
    const newpassword = ctx.request.body.newpassword;
    if (!newpassword) {
      return ctx.badRequest('Invalid new password,try again');
    }
    return Token.create({ token, unconfirm_id: ctx.state.user._id, data: JSON.stringify(newpassword) }).then((data) => {
      if (!data) {
        return ctx.send(data);
      }
      return strapi.plugins.email.services.email.send({
        from: ctx.state.user.email,
        to: ctx.state.user.email,
        html: `<a href=\`http://localhost:1337/passwordconfirm?token=${token}\`>Are you sure?</a>`,
        text: 'Change password'
      })
        .then(() => {
          return ctx.send('Check your email');
        })
        .catch((err) => {
          return ctx.badRequest(err);
        });
    });
  },
  passwordconfirm: (ctx) => {
    const { token } = ctx.query;
    return Token.findOne({ token: token }).then(token => {
      if (!token) {
        return ctx.badRequest('Invalid Token');
      }
      return strapi.plugins['users-permissions'].models.user.findOne({ _id: token.unconfirm_id }).then(user => {
        user.password = bcrypt.hashSync(token.data, 10);
        user.save();
        token.remove();
        return ctx.send('Password changed');
      }).catch(error => {
        return ctx.send(error);
      });
    });
  },
  treatment: async (ctx) => {
    return Treatmentcatalog.findOne({ title: ctx.request.body.treatmentcatalog }).then(catalog => {
      if (!catalog) {
        return ctx.badRequest('Invalid treatment catalog');
      }
      ctx.request.body.treatmentcatalog = catalog._id;
      ctx.request.body.user_id = ctx.state.user._id;
      return Treatments.create(ctx.request.body).then((treatment) => {
        return ctx.send(treatment);
      }).catch(error => {
        return ctx.badRequest(error);
      });
    });

  },
  book: async (ctx) => {
    const treatment = await Treatments.findOne({ _id: ctx.query.id });
    if (!treatment) {
      return ctx.badRequest('Treatment not found');
    }
    return Bookings.find({ user_id: ctx.state.user._id }).then(books => {
      let check = false;
      const date = Date.parse(ctx.request.body.Date);
      if (books) {
        books.forEach(book => {
          if (Date.parse(book.Date) === date) {
            check = true;
          }
        });
      }
      if (check) {
        return ctx.badRequest('You already have booking on this Date with same time');
      }
      return Bookings.create({
        user_id: ctx.state.user._id,
        Date: ctx.request.body.Date,
        Duration: treatment.Duration,
        treatment: treatment._id,
        Address: ctx.request.body.Address
      })
        .then((booking) => {
          return ctx.send(booking);
        }).catch(error => {
          return ctx.badRequest(error);
        });
    });
  },
  payment: async (ctx) => {
    const { token } = ctx.request.body;
    return stripe.charges.create({
      amount: 1700,
      currency: 'usd',
      description: 'Bargain Basement Charge',
      source: token,
    }).then((err, charge) => {
      if (err) {

        return ctx.badRequest(err);
      }
      else {
        return ctx.send(charge);
      }

    });
  },
  createSchedule: async (ctx) => {
    const { schedule } = ctx.request.body;
    if (!schedule || schedule.length < 1) {
      ctx.badRequest('Invalid schedule');
    }
    const array_promise = [];
    const user_schedule = ctx.state.user.schedule;
    schedule.forEach(day => {
      day.Date = new Date(day.Date);
      day.schedule = user_schedule;
      const promise = Scheduleday.create(day);
      array_promise.push(promise);
    });
    return Promise.all(array_promise).then((data) => {
      ctx.send(data);
    }).catch(error => {
      ctx.badRequest(error);
    });
  },
  getSingleStylist: async (ctx) => {
    return strapi.plugins['users-permissions'].models.user.findOne({ _id: ctx.query.id })
      .populate(['role', 'purse', 'blogs', 'referalcode', 'treatments', 'invited_by'])
      .then(stylist => {
        if (!stylist) {
          return ctx.badRequest('Stylist not found');
        }
        return Schedule.findOne({ _id: stylist.schedule })
          .populate('scheduleDays')
          .then(schedule => {
            if (!schedule) {
              return ctx.badRequest('The stylist did not set up his schedule.');
            }
            stylist.schedule = schedule;
            return ctx.send(stylist);
          });
      });
  },
  subscribe: async (ctx) => {
    return Subscribers.create(ctx.request.body).then(subscribe => {
      if (!subscribe) {
        return ctx.badRequest('Creation failed');
      }
      return ctx.send(subscribe);
    }).catch(error => {
      return ctx.badRequest(`Creation failed: \\n ${error}`);
    });
  },
  unsubscribe: async (ctx) => {
    const token = crypto.randomBytes(10).toString('hex');
    const { email } = ctx.request.body;
    return Token.create({ token, unconfirm_id: ctx.state.user._id, data: email }).then(token => {
      if (!token) {
        return ctx.send(token);
      }
      return strapi.plugins.email.services.email.send({
        from: ctx.request.body.email,
        to: ctx.request.body.email,
        html: `<a href=\`http://localhost:1337/unsubscribeConfirm?token=${token}\`>Are you sure?</a>`,
        text: 'Unsubscribe confirm'
      })
        .then(() => {
          return ctx.send('Check your email');
        })
        .catch((err) => {
          return ctx.badRequest(err);
        });
    }).catch(err => {
      return ctx.send(err);
    });
  },
  unsubscribeConfirm: async (ctx) => {
    const { token } = ctx.query;
    return Token.findOne({ token: token }).then(token => {
      if (!token) {
        return ctx.badRequest('Invalid Token');
      }
      return Subscribers.findOne({ email: token.data }).then(sub => {
        if (!sub) {
          return ctx.badRequest(sub);
        }
        sub.remove();
        return ctx.send('Unsubscribe successfull');
      });
    });
  },
  becomeStylist: async (ctx) => {
    StylistApplication.create(ctx.request.body).then(application => {
      if (!application) {
        return ctx.badRequest('Creation failed');
      }
      return ctx.send(application);
    }).catch(error => {
      return ctx.badRequest(`Creation failed: \\n ${error}`);
    });
  },
  treatmentPage: async (ctx) => {
    return Treatmentcatalog
      .find({})
      .populate('treatments')
      .then(catalogs => {
        return ctx.send(catalogs);
      })
      .catch(error => {
        return ctx.badRequest(`Failed: \\n ${error}`);
      });
  },
  treatmentStylist: async (ctx) => {
    return Treatments.find({ user_id: ctx.query.id })
      .then(treatments => {
        if (!treatments || treatments.length < 1) {
          return ctx.badRequest('Failed');
        }
        return ctx.send(treatments);
      })
      .catch(error => {
        return ctx.badRequest(`Failed: \\n ${error}`);
      });
  },
  cancelBooking: async (ctx) => {
    return Bookings.findOne({ _id: ctx.query.id, user_id: ctx.state.user._id }).then(book => {
      if (!book) {
        ctx.badRequest('Failed');
      }
      book.remove();
      ctx.send('Book removed');
    });
  }
};
