import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { toast } from 'react-toastify';
import api from '~/services/api';

import {
  Container,
  Wrapper,
  MeetupItem,
  MeetupList,
  NewMeetupButton,
} from './styles';

import Loading from '~/components/Loading';

export default function Meetup() {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('organizing');
        const data = response.data.rows.map(meetup => {
          return {
            ...meetup,
            formattedDate: format(
              parseISO(meetup.date),
              "dd 'de' MMMM, 'às' HH:mm",
              {
                locale: pt,
              }
            ),
            past: isBefore(parseISO(meetup.date), Date.now()),
          };
        });

        setMeetups(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.info(
          'Você ainda não tem meetups cadastradas, se deseja, crie uma :) !'
        );
      }
    }
    loadMeetups();
  }, []);

  return (
    <Container>
      {loading && (
        <Wrapper>
          <Loading color="#f94d6a" height={100} />
        </Wrapper>
      )}

      {!loading && (
        <header>
          <div>
            <NewMeetupButton to="/meetup">
              <IoIosAddCircleOutline size={20} />
              Novo meetup
            </NewMeetupButton>
          </div>
        </header>
      )}

      {!loading && (
        <MeetupList>
          {meetups.map(meetup => (
            <MeetupItem key={meetup.id} past={meetup.past}>
              <Link to={`/meetup/${meetup.id}`}>{meetup.title} </Link>
              <time>{meetup.formattedDate}</time>
            </MeetupItem>
          ))}
        </MeetupList>
      )}
    </Container>
  );
}
