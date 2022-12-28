import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import ModalContainer from './../components/Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Input, NormalButton } from '../styles/Styled';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
const AddressInput = styled(Input)`
	width: 200px;
	margin: 0 5px 5px 10px;
	width: 250px;
`;

const Line = styled.div`
	margin-bottom: 5px;
	display: flex;
	justify-content: end;
	align-items: center;
`;

const Label = styled.label`
	width: 80px;
`;

const FindAddress = ({ name, setAddress, setDetailAddress }) => {
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();
	const [openDetailAddress, setOpenDetailAddress] = useState(false);

	const onClickComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress +=
					extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		setAddress(fullAddress);
		dispatch(closeModal());
	};

	return (
		<Container>
			{modalOpen && (
				<div>
					<ModalContainer>
						<DaumPostcode
							className="postmodal"
							autoClose
							onComplete={onClickComplete}
						/>
					</ModalContainer>
				</div>
			)}
			<Line>
				<Label>농장주소</Label>
				<AddressInput value={name} type="text" readOnly />
				<NormalButton
					type="NormalButton"
					onClick={() => {
						dispatch(showModal());
						setOpenDetailAddress(true);
					}}
				>
					검색
				</NormalButton>
			</Line>
			{openDetailAddress && (
				<AddressInput
					type="text"
					name="detailAddress"
					placeholder="상세주소를 입력해주세요"
					onChange={(e) => {
						setDetailAddress(e.target.value);
					}}
				></AddressInput>
			)}
		</Container>
	);
};

export default FindAddress;
