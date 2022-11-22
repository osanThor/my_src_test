import React from 'react';
import styled from 'styled-components';

const MessageContainer = ({ children }: { children: React.ReactNode }) => {
  return <MessageContainerBlock>{children}</MessageContainerBlock>;
};

const MessageContainerBlock = styled.div`
  width: 100%;
  height: 100%;
`;

export default MessageContainer;
