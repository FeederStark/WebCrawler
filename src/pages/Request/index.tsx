import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import api from '../../services/api';
import { Empty, Header, RequestInfo, Urls } from './styles';

interface RequestParams {
  name: string;
  id: string;
}

interface Request {
  urls: string[];
}

const Request: React.FC = () => {
  const [request, setRequest] = useState<Request | null>(null);
  const { params } = useRouteMatch<RequestParams>();

  useEffect(() => {
    async function loadData() {
      const requestInfo = await api.get(`/crawl/${params.id}`);
      setRequest(requestInfo.data);
    }

    loadData();
  }, [params.id]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Back
        </Link>
      </Header>
      {request && (
        <RequestInfo>
          <header>
            <div>
              <strong>{params.name}</strong>
            </div>
          </header>
        </RequestInfo>
      )}
      {request && !_.isEmpty(request.urls) ? (
        <Urls>
          {request.urls.map(url => (
            <a key={url} href={url}>
              <div>
                <strong>{url}</strong>
                <p>{url}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          ))}
        </Urls>
      ) : (
        <Empty>There are no urls found for this request.</Empty>
      )}
    </>
  );
};

export default Request;
