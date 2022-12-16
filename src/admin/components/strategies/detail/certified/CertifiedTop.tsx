import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';
import CustomSelect from '../../write/items/CustomSelect';

const certifiedOptions = [
  { txt: '인증 요청', value: 'REQUEST' },
  { txt: '확인중', value: 'CHECKING' },
  { txt: '인증 완료', value: 'CONFIRMED' },
];

const CertifiedTop = ({
  selectPlace,
  setCertufuedSt,
}: {
  selectPlace: string;
  setCertufuedSt: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <CertifiedTopBlock>
      <div className="title">
        전략인증 상세
        <div className="select">
          <CustomSelect options={certifiedOptions} place={selectPlace} setSearchName={setCertufuedSt} />
        </div>
      </div>
    </CertifiedTopBlock>
  );
};
const CertifiedTopBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  & > .title {
    display: flex;
    justify-content: space-between;
  }
  .boardTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .admin_tab {
      display: flex;
      align-items: center;
      .menu {
        padding: 4px 1rem;
        background-color: ${colors.blue[0]};
        border-radius: 24px;
        color: ${colors.blue[2]};
        cursor: pointer;
        margin-right: 1rem;
        transition: all 0.2s;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          background-color: ${colors.blue[2]};
          color: white;
        }
        &.on {
          background-color: ${colors.blue[2]};
          color: white;
        }
      }
    }
  }
`;

export default CertifiedTop;
