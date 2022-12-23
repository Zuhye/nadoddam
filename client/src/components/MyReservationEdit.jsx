import { useState, useEffect} from "react";
import ModalContainer from '../components/Modal';
import { showModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledList, StyledListInner,StyledImageWrap } from "../pages/MyReservation";
import Location from '../components/Location';
import styled from 'styled-components';

const StyledTitleWrap = styled.div`
  display:flex;
`

const StyledContentWrap = styled.div`
  display:flex;
  justify-content:space-between;
`


const MyReservationEdit = ({filterdData}) => {
  const [dataIndex, setReservationDataIndex] = useState();
  const [cancleReservation, setCancleReservation] = useState(false);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);

  const ShowResrvation = () => {
    return (<>
      {filterdData.map((item , index) => { 
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>농장이미지</StyledImageWrap>
              <div>
                <div>
                  <h3 style={{
                    textDecoration : item.status === '예약취소' 
                    ? 'line-through' 
                    : 'none'}}>
                      농장명 / 체험명
                  </h3> 
                  <div>{item.status}</div> 
                </div>
                <div>{item.data}</div>
                <div>{item.personnel}명</div>
                <div>결제금액 : {(item.total_price).toLocaleString()}원</div>
              </div>
            </StyledListInner>
            <div>
              <button 
              name={index} 
              onClick={(e)=> {
              setReservationDataIndex(e.target.name)
              dispatch(showModal())}}>
                더보기
              </button>
              {item.status === '예약완료' 
              ? <button 
                  name={index}
                  onClick={(e)=> {
                    setReservationDataIndex(e.target.name)
                    setCancleReservation(prev =>!prev)
                  }}>예약취소</button> 
              : item.status === '체험완료' 
              ? <button>후기작성</button> 
              : null}
            </div>
          </StyledList>
          )
        })}
    </>  
    )
  }

  const CancleReservation = () => {
    const filterDataArr = [filterdData[dataIndex]];
    console.log(filterDataArr);
    return (
      <>
      {filterDataArr.map(item => (
         <div key={dataIndex}>
          <p>예약번호</p>
          <p>예약자</p>
          <p>{item.data}</p>
          <p>인원{item.personnel}명</p>
          <p>취소사유</p>
          <p>최종환불금액: {item.total_price}</p>
          <button>이전</button>
        </div>
      )
    )} 
    </>   
    )
  }
  
  const DetailReservation = () => {
    const filterDataArr = [filterdData[dataIndex]];
    
    return (
      <>
        {filterDataArr.map(item => {
          return <div key={`${dataIndex}`-`${item.data}`}>
            {!cancleReservation 
              ? (<div>
                    <StyledTitleWrap>
                      <div>농장이미지</div>
                      <div>
                        <h4 style={{
                          textDecoration : item.status === '예약취소' 
                          ? 'line-through' 
                          : 'none'}}>
                            농장명 / 체험명({item.status})
                        </h4> 
                        <p>{item.data}</p>
                      </div>
                  </StyledTitleWrap>
                    <div>
                      <p>예약정보</p>
                      <StyledContentWrap>
                        <div>
                          <p>날짜</p>
                          <p>{item.data}</p>
                          <p>시간</p>
                          <p>14:00</p>
                          <p>인원</p>
                          <p>{item.personnel}명</p>
                        </div>
                        <Location location='충청남도 보령시 남포면 농장길 194-61'/>
                      </StyledContentWrap>
                      <div>
                        <div>
                          <p>결제수단</p>
                          <p>결제수단</p>
                        </div>
                        <div>
                          <p>결제금액</p>
                          <p>{item.total_price}</p>
                        </div>
                      </div>
                    </div>
                    {item.status === "예약완료" 
                    ? <button 
                      onClick={() => 
                      setCancleReservation(prev =>!prev)}> 
                        예약취소
                      </button> 
                    : null}
                  </div>) 
                : <CancleReservation />
              }
            </div>
          })}
      </>
    )
  }



  return (
    <>
    {!cancleReservation ? <ShowResrvation />: <CancleReservation/>}
    {modalOpen && <ModalContainer><DetailReservation /></ModalContainer>}
      
    </>
  )
}

export default MyReservationEdit;