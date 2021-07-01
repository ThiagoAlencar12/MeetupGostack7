import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const page = req.query.page || 1;
    const per_page = req.query.per_page || 10;
    const { id } = req.params;

    if (id) {
      const meetup = await Meetup.findOne({
        where: { id },
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

    const where = {};

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAndCountAll({
      where,
      attributes: ['id', 'title', 'description', 'location', 'date'],
      order: ['date'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('Título é obrigatório'),
      file_id: Yup.number().required('Uma imagem é obrigatória'),
      description: Yup.string().required('Descrição é obrigatório'),
      location: Yup.string().required('Local é obrigatório'),
      date: Yup.date().required('Data é obrigatória'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Digite os dados corretamente' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({
        message: 'Essa data já passou',
      });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ message: 'Meetup não encontrado' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ message: 'Acesso não permitido' });
    }

    if (meetup.past) {
      return res.status(400).json({
        message: 'Esse meetup já foi realizado e não pode ser alterado',
      });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ message: 'Meetup não encontrado' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ message: 'Acesso não permitido' });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ message: 'Meetup que já aconteceu não pode ser excluído' });
    }

    await meetup.destroy();

    return res.json({ message: 'Meetup excluído com sucesso' });
  }
}

export default new MeetupController();
