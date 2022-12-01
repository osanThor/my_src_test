import { createSlice } from '@reduxjs/toolkit';

export type LocalStateType = {
  bgBlur: boolean;
  basic: boolean;
  order: boolean;
  quantity: boolean;
  option: boolean;
  orderMessage: boolean;
  noSignMessage: boolean;
  errorMessage: boolean;
  editMyProfile: boolean;
  myBoards: boolean;
  myWritenBoards: boolean;
  myComments: boolean;
  myLikes: boolean;
  myCollections: boolean;
  myInquiries: boolean;
  communityDiscussion: boolean;
  communityCommission: boolean;
  communityRank: boolean;
  communityNotice: boolean;
};

const initialState: LocalStateType = {
  //container blur state
  bgBlur: false,
  //writeQuant state
  basic: true,
  order: false,
  quantity: false,
  option: false,
  //message state
  orderMessage: true,
  noSignMessage: false,
  errorMessage: false,
  //mypage state
  editMyProfile: false,
  myBoards: false,
  myWritenBoards: false,
  myComments: false,
  myLikes: false,
  myCollections: false,
  myInquiries: false,
  //community
  communityDiscussion: false,
  communityCommission: false,
  communityRank: false,
  communityNotice: false,
};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    //reset
    initializeAuthForm(state) {
      Object.assign(state, initialState);
    },
    //container blur
    isLocalBgBlur(state) {
      state.bgBlur = true;
    },
    isNotLocalBgBlur(state) {
      state.bgBlur = false;
    },
    //writeQuant Actions
    gotoBasic(state) {
      state.basic = true;
      state.order = false;
      state.quantity = false;
      state.option = false;
    },
    gotoOrder(state) {
      state.basic = false;
      state.order = true;
      state.quantity = false;
      state.option = false;
    },
    gotoQuantity(state) {
      state.basic = false;
      state.order = false;
      state.quantity = true;
      state.option = false;
    },
    gotoOption(state) {
      state.basic = false;
      state.order = false;
      state.quantity = false;
      state.option = true;
    },
    //message Page Actions
    gotoOrderMessage(state) {
      state.orderMessage = true;
      state.noSignMessage = false;
      state.errorMessage = false;
    },
    gotoNoSignMessage(state) {
      state.orderMessage = false;
      state.noSignMessage = true;
      state.errorMessage = false;
    },
    gotoErrorMessage(state) {
      state.orderMessage = false;
      state.noSignMessage = false;
      state.errorMessage = true;
    },
    //mypage Page Actions
    gotoEditMyProfile(state) {
      state.editMyProfile = true;
      state.myBoards = false;
    },
    gotoMyBoards(state) {
      state.editMyProfile = false;
      state.myBoards = true;
    },
    gotoMyWritenBoards(state) {
      state.myWritenBoards = true;
      state.myComments = false;
      state.myLikes = false;
      state.myCollections = false;
      state.myInquiries = false;
    },
    gotoMyComments(state) {
      state.myWritenBoards = false;
      state.myComments = true;
      state.myLikes = false;
      state.myCollections = false;
      state.myInquiries = false;
    },
    gotoMyLikes(state) {
      state.myWritenBoards = false;
      state.myComments = false;
      state.myLikes = true;
      state.myCollections = false;
      state.myInquiries = false;
    },
    gotoMyCollections(state) {
      state.myWritenBoards = false;
      state.myComments = false;
      state.myLikes = false;
      state.myCollections = true;
      state.myInquiries = false;
    },
    gotoMyInquiries(state) {
      state.myWritenBoards = false;
      state.myComments = false;
      state.myLikes = false;
      state.myCollections = false;
      state.myInquiries = true;
    },
    // community Actions
    gotoComDiscussion(state) {
      state.communityDiscussion = true;
      state.communityCommission = false;
      state.communityRank = false;
      state.communityNotice = false;
    },
    gotoComCommission(state) {
      state.communityDiscussion = false;
      state.communityCommission = true;
      state.communityRank = false;
      state.communityNotice = false;
    },
    gotoComRank(state) {
      state.communityDiscussion = false;
      state.communityCommission = false;
      state.communityRank = true;
      state.communityNotice = false;
    },
    gotoComNotice(state) {
      state.communityDiscussion = false;
      state.communityCommission = false;
      state.communityRank = false;
      state.communityNotice = true;
    },
  },
});

export const localActions = localSlice.actions;
// RootReducer 생성 시 사용
export default localSlice.reducer;
