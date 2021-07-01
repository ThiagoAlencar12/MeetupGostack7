import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';
import Subscription from '../models/Subscription';

class OrganizingController {
  async index(req, res) {
    const meetups = await Meetup.findAndCountAll({
      where: { user_id: req.userId },
    });

    return res.json(meetups);
  }

  async show(req, res) {
    const { id } = req.params;

    if (id) {
      const meetup = await Meetup.findOne({
        where: { id, user_id: req.userId },
        attributes: ['id', 'title', 'description', 'location', 'date'],
        include: [
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      if (meetup) {
        return res.json(meetup);
      }

      return res.status(400).json({ message: 'Meetup não encontrado' });
    }

    const subscriptions = await Subscription.findAll({
      where: {
        meetup_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['path', 'url'],
        },
      ],
      attributes: [],
    });

    return res.json({
      subscriptions,
    });
  }
}

export default new OrganizingController();
