import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { Form, Request, RequestsContainer, Title } from './styles';

interface RequestData {
  id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [newRequest, setNewRequest] = useState('');
  const [requests, setRequests] = useState<RequestData[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@WebCrawler:inspectionRequests',
    );
    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    }
    return [];
  });

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem(
      '@WebCrawler:inspectionRequests',
      JSON.stringify(requests),
    );
  }, [requests]);

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      if (!newRequest) {
        addToast({
          type: 'error',
          title: 'Error in creating request.',
          description: 'You cannot search for an empty field.',
        });

        return;
      }

      if (requests.find(r => r.name === newRequest)) {
        addToast({
          type: 'error',
          title: 'Error in creating request.',
          description: 'This request has already been created.',
        });
        return;
      }

      try {
        const response = await api.post('crawl', { keyword: newRequest });

        if (response.data.status === 400) {
          addToast({
            type: 'error',
            title: 'Error in creating request.',
            description: response.data.message,
          });

          return;
        }

        const request = { id: response.data.id, name: newRequest };

        setRequests(r => [...r, request]);
        setNewRequest('');

        addToast({
          type: 'success',
          title: 'request creation.',
          description: 'Your request has been successfully created.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error in creating request.',
          description:
            'There was an error in creating this request, it may be a problem in the api or what you typed could not be requested.',
        });
      }
    },
    [addToast, newRequest, requests],
  );

  const handleClickRequest = useCallback(
    async (requestInfo: RequestData): Promise<void> => {
      setLoading(true);
      try {
        const response = await api.get(`/crawl/${requestInfo.id}`);
        if (response.data.status === 'done') {
          history.replace(`/request/${requestInfo.name}/${requestInfo.id}`);
          return;
        }
        addToast({
          title: 'request status.',
          description: 'Your request is still being processed.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error in consulting request.',
          description:
            'There was an error in consulting this request, it may be a problem in the api.',
        });
      } finally {
        setLoading(false);
      }
    },

    [addToast, history],
  );

  return (
    <>
      <Title>The easy-way web crawling</Title>
      <Form onSubmit={handleAddRepository}>
        <input
          value={newRequest}
          onChange={e => setNewRequest(e.target.value)}
          placeholder="Type in your inspection request."
        />
        <button type="submit">Search</button>
      </Form>
      <RequestsContainer>
        {requests.map(request => (
          <Request
            loading={loading}
            key={request.id}
            onClick={
              () =>
                !loading &&
                handleClickRequest({ name: request.name, id: request.id })
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            <h3>{request.name}</h3>
            <p>
              The api does not return any text response besides the request
              name, so imagine there is a description here
            </p>
            <div>
              <div>
                <FiChevronRight size={20} />
              </div>
            </div>
          </Request>
        ))}
      </RequestsContainer>
    </>
  );
};

export default Dashboard;
